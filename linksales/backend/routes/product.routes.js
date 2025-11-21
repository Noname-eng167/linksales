import express from "express";
import ProductController from "../controllers/productController.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateProduct } from "../middlewares/validation.js";

const router = express.Router();

// Buscar todos os produtos
router.get("/", ProductController.list);

// Criar um produto (protegido + validado)
router.post("/", authMiddleware, validateProduct, ProductController.create);

// Buscar produto por ID (show)
router.get("/:id", ProductController.show);

// Atualizar um produto (protegido + validado)
router.put("/:id", authMiddleware, validateProduct, ProductController.update);

// Deletar um produto (protegido)
router.delete("/:id", authMiddleware, ProductController.delete)

export default router;