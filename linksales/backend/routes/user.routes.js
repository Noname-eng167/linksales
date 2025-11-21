import express from 'express';
import UserController from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateUser } from '../middlewares/validation.js';

const router = express.Router();

// criar novo usuário (rota **não protegida**, com validação)
router.post('/users', validateUser, UserController.create);

// Exemplo de rota de login (não protegida, mas com validação de credenciais)
router.post('/login', validateUser, UserController.login);

// buscar um usuário específico
router.get('/users/:id', authMiddleware, UserController.show);

// listar todos os usuários (protegido)
router.get('/users', authMiddleware, UserController.list); 

// atualizar um usuário (protegido E validado)
router.put('/users/:id', authMiddleware, validateUser, UserController.update);

// deletar um usuário (protegido)
router.delete('/users/:id', authMiddleware, UserController.delete);

export default router;