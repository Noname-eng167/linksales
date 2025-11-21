import UserModel from '../models/user.js';

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
        // 1. Encontra o usuário pelo e-mail
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            // Não deve informar se o email ou a senha estão errados. Mensagem genérica.
            throw new Error('Credenciais inválidas.');
        }

        // 2. Verifica a senha usando o método que adicionamos ao modelo
        const isPasswordValid = await user.checkPassword(password); 
        
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas.');
        }

        // 3. Retorna o usuário
        return user;
    }


    // Criar novo usuário
    async createUser(userData) {
        // mas verificar antes é bom para lançar um erro mais claro.
        const existingUser = await UserModel.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('Email já cadastrado.'); // Retorna 400 no Controller
        }

        // O hook `beforeCreate` no modelo cuidará da criptografia da senha.
        const newUser = await UserModel.create(userData);
        return newUser;
    }

    // Buscar todos os usuários
    async getAllUsers() {
        // Excluir a senha das consultas de listagem por segurança
        return await UserModel.findAll({ attributes: { exclude: ['senha'] } });
    }

    // Buscar usuário por ID
    async getUserById(id) {
        const user = await UserModel.findByPk(id, { attributes: { exclude: ['senha'] } });
        if (!user) {
            throw new UserNotFoundError('Usuário não encontrado.');
        }
        return user;
    }

    // Atualizar usuário 
    async updateUser(id, data) {
        // 1. Atualiza e retorna a contagem de linhas afetadas
        const [rowsAffected, [updatedUser]] = await UserModel.update(data, {
            where: { id_usuario: id }, 
            returning: true, // Retorna os dados atualizados
            individualHooks: true // Garante que o hook beforeUpdate seja chamado (para hash de senha)
        });

        if (rowsAffected === 0) {
            throw new UserNotFoundError('Usuário não encontrado para atualização.');
        }
        
        // Retorna o objeto atualizado (excluindo a senha)
        updatedUser.senha = undefined; // Remove a senha do objeto de retorno por segurança
        return updatedUser;
    }

    // Deletar usuário (Melhor uso do Sequelize)
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

export default new UserService();