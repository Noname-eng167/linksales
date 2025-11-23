// backend/controllers/userController.js
import UserService, { UserNotFoundError } from '../service/userService.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao';

class UserController {
    
    // Rota: POST /login (NÃO protegida)
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // 1. Autentica no Service
            const user = await UserService.login(email, password);

            // 2. Gera o Token JWT
            const token = jwt.sign(
                { id: user.id_usuario, email: user.email, tipo: user.tipo_conta },
                SECRET,
                { expiresIn: '1h' }
            );

            // 3. Retorna o token e os dados básicos
            return res.status(200).json({ 
                message: 'Login bem-sucedido!', 
                token: token,
                user: {
                    id: user.id_usuario,
                    email: user.email,
                    tipo: user.tipo_conta
                }
            });

        } catch (error) {
            if (error.message === 'Credenciais inválidas.') {
                return res.status(401).json({ error: 'Email ou senha inválidos.' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor durante o login.' });
        }
    }


    // Rota: POST /users (Criação)
    async create(req, res) {
        try {
            const newUser = await UserService.createUser(req.body);

            // Segurança: Remove a senha do retorno
            const { senha, ...userResponse } = newUser.toJSON ? newUser.toJSON() : newUser;
            
            return res.status(201).json({ 
                message: 'Usuário criado com sucesso!', 
                user: userResponse 
            });

        } catch (error) {
            console.error('ERRO NO CREATE:', error);
            if (error.message.includes('Email já cadastrado') || error.name === 'SequelizeUniqueConstraintError') {
                 return res.status(409).json({ error: 'Email ou CPF já cadastrado.' });
            }
            if (error.name === 'SequelizeValidationError') {
                 return res.status(400).json({ error: error.message }); 
            }
            return res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    }


    // Rota: GET /users (Listagem)
    async list(_req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar usuários.' });
        }
    }

    // Rota: GET /users/:id (Busca por ID)
    async show(_req, res) {
        try {
            const { id } = _req.params;
            const user = await UserService.getUserById(id);
            
            // Segurança extra (caso o Service tenha retornado com senha)
            const userJson = user.toJSON();
            const { senha, ...userData } = userJson;

            return res.json(userData);

        } catch (error) {
            if (error.name ==='UserNotFoundError') {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
            return res.status(500).json({ error: 'Erro ao buscar usuário.' });
        }
    }

    // Rota: PUT /users/:id (Atualização)
    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await UserService.updateUser(id, req.body);
            
            // Segurança: Remove a senha do retorno
            const { senha, ...userResponse } = updatedUser.toJSON ? updatedUser.toJSON() : updatedUser;

            return res.status(200).json({ 
                message: 'Usuário atualizado com sucesso!', 
                user: userResponse 
            });

        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ error: error.message });
            }
            // Tratamento para E-mail duplicado na edição
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: 'Este e-mail já está em uso.' });
            }
            if (error.name === 'SequelizeValidationError' || error.message.includes('inválido')) {
                 return res.status(400).json({ error: error.message }); 
            }
            return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
        }
    }

    // Rota: DELETE /users/:id (Exclusão)
    async delete(_req, res) {
        try {
            const { id } = _req.params;
            await UserService.deleteUser(id);
            
            return res.status(204).send();

        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
    }
}

export default new UserController();