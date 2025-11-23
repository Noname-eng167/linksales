import UserModel from '../models/user.js';
// 1. Importando a conexão para usar Transações
import { sequelize } from '../database/connection.js'; 
// 2. Importando os modelos de tabelas relacionadas
import ComercianteModel from '../models/Comerciante.js';
import ClienteModel from '../models/Cliente.js';
import bcrypt from 'bcrypt';

// Definição do erro 404 
export class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
        this.status = 404; 
    }
}

class UserService {
    
    async login(email, password) {
        // 1. Busca o usuário
        const user = await UserModel.findOne({ 
            where: { email },
            // Garante que estamos trazendo a senha do banco
            attributes: ['id_usuario', 'email', 'senha', 'tipo_conta', 'id_comerciante', 'id_cliente']
        });

        if (!user) {
            console.log("❌ Login falhou: Usuário não encontrado no banco.");
            throw new Error('Credenciais inválidas.');
        }

        // 🔍 DEBUG: Vamos ver o que tem no banco e o que chegou
        console.log("====================================");
        console.log("🔍 DEBUG LOGIN:");
        console.log("📧 Email:", email);
        console.log("🔑 Senha Digitada:", password);
        console.log("🔒 Senha no Banco (Hash):", user.senha);
        
        // Verifica se a senha no banco é um hash do bcrypt (começa com $2b$)
        const isHash = user.senha && user.senha.startsWith('$2b$');
        console.log("A senha do banco é um hash válido?", isHash ? "SIM" : "NÃO (Isso é um problema!)");

        // 2. Verifica a senha
        // Se a senha no banco NÃO for hash (for texto puro), o compare vai dar erro ou false
        const isPasswordValid = await user.checkPassword(password); 
        
        console.log("✅ Resultado da Comparação:", isPasswordValid);
        console.log("====================================");
        
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas.');
        }

        return user;
    }

    async createUser(userData) {
        const transaction = await sequelize.transaction();
        try {
            const { email, senha, tipo_conta, telefone, cpf, nome, nome_comerciante, nascimento } = userData;

            // Validações básicas antes de tentar criar
            if (!email || !senha || !cpf) {
                throw new Error('Dados obrigatórios faltando (Email, Senha ou CPF).');
            }

            let id_comerciante = null;
            let id_cliente = null;

            if (tipo_conta === 'comerciante') {
                // Verifica Duplicidade
                const existingComerciante = await ComercianteModel.findOne({ where: { cpnj: cpf }, transaction });
                if (existingComerciante) throw new Error('CNPJ já cadastrado.');

                // Cria Comerciante
                const novoComerciante = await ComercianteModel.create({
                    nome_loja: nome_comerciante || nome, 
                    cpnj: cpf, 
                    telefone: telefone,
                }, { transaction });
                
                id_comerciante = novoComerciante.id_comerciante;

            } else {
                // Verifica Duplicidade
                const existingCliente = await ClienteModel.findOne({ where: { cpf: cpf }, transaction });
                if (existingCliente) throw new Error('CPF já cadastrado.');

                // Cria Cliente
                const novoCliente = await ClienteModel.create({
                    nome: nome,
                    cpf: cpf, 
                    nascimento: nascimento, 
                    telefone: telefone // Adicionando telefone ao cliente também
                }, { transaction });
                
                id_cliente = novoCliente.id_cliente;
            }

            // Verifica Duplicidade de Email
            const existingUser = await UserModel.findOne({ where: { email }, transaction });
            if (existingUser) throw new Error('Email já cadastrado.');

            // Cria Usuário
            // IMPORTANTE: Passamos explicitamente null se o ID não existir
            const novoUsuario = await UserModel.create({
                email: email,
                senha: senha, 
                tipo_conta: tipo_conta,
                id_comerciante: id_comerciante, 
                id_cliente: id_cliente
            }, { transaction });

            await transaction.commit();
            
            return { 
                usuario: { id: novoUsuario.id_usuario, email: novoUsuario.email },
                perfil: id_comerciante ? 'comerciante' : 'cliente'
            };

        } catch (error) {
            await transaction.rollback();
            console.error('Falha detalhada na criação:', error);
            throw error;
        }
    }

    // Buscar todos os usuários
    async getAllUsers() {
        // Excluir a senha das consultas de listagem por segurança
        return await UserModel.findAll({ attributes: { exclude: ['senha'] } });
    }

    // Buscar usuário por ID
    async getUserById(id) {
        const user = await UserModel.findByPk(id, { 
            attributes: { exclude: ['senha'] },
            include: [
                { model: ComercianteModel, as: 'comerciante', required: false },
                { model: ClienteModel, as: 'cliente', required: false }
            ]
        });

        if (!user) {
            throw new UserNotFoundError('Usuário não encontrado.');
        }

        // Achata o objeto para facilitar pro frontend
        const userJson = user.toJSON();
        let responseData = { ...userJson };
        
        if (user.tipo_conta === 'comerciante' && user.comerciante) {
            responseData.nome_comerciante = user.comerciante.nome_loja;
            responseData.cpf = user.comerciante.cpnj;
            responseData.telefone = user.comerciante.telefone;
        } else if (user.tipo_conta === 'cliente' && user.cliente) {
            responseData.nome = user.cliente.nome;
            responseData.cpf = user.cliente.cpf;
        }

        return responseData;
    }

    // Atualizar usuário 
    async updateUser(id, data) {
        const transaction = await sequelize.transaction();
        try {
            const user = await UserModel.findByPk(id);
            if (!user) {
                throw new UserNotFoundError('Usuário não encontrado para atualização.');
            }

            const { email, senha, ...profileData } = data;

            // Atualiza Login
            if (email || senha) {
                const userUpdateData = {};
                if (email) userUpdateData.email = email;
                if (senha) {
                    const salt = await bcrypt.genSalt(10);
                    userUpdateData.senha = await bcrypt.hash(senha, salt);
                }
                await user.update(userUpdateData, { transaction });
            }

            // Atualiza Perfil
            if (user.tipo_conta === 'comerciante' && user.id_comerciante) {
                const comercianteData = {};
                if (profileData.nome_comerciante) comercianteData.nome_loja = profileData.nome_comerciante;
                if (profileData.cpf) comercianteData.cpnj = profileData.cpf; 
                if (profileData.telefone) comercianteData.telefone = profileData.telefone;

                await ComercianteModel.update(comercianteData, {
                    where: { id_comerciante: user.id_comerciante },
                    transaction
                });

            } else if (user.tipo_conta === 'cliente' && user.id_cliente) {
                const clienteData = {};
                if (profileData.nome) clienteData.nome = profileData.nome;
                if (profileData.cpf) clienteData.cpf = profileData.cpf;

                await ClienteModel.update(clienteData, {
                    where: { id_cliente: user.id_cliente },
                    transaction
                });
            }

            await transaction.commit();

            // Retorna o usuário atualizado
            return await this.getUserById(id);

        } catch (error) {
            await transaction.rollback();
            console.error('Erro no update:', error);
            throw error;
        }
    }

    // Deletar usuário
    async deleteUser(id) {
        const rowsDeleted = await UserModel.destroy({
            where: { id_usuario: id }
        });
        
        if (rowsDeleted === 0) {
            throw new UserNotFoundError('Usuário não encontrado para exclusão.');
        }
        return true;
    }
}

// Configuração Rápida de Associações (Se não estiverem nos arquivos de modelo)
UserModel.belongsTo(ComercianteModel, { foreignKey: 'id_comerciante', as: 'comerciante' });
UserModel.belongsTo(ClienteModel, { foreignKey: 'id_cliente', as: 'cliente' });

export default new UserService();