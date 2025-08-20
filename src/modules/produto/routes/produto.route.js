import { Router } from "express";
import ProdutosController from '../controllers/produto.controller.js';

const router = Router();

// Rota criar produto
router.post("/cadastrar", ProdutosController.cadastrar);

// Rota listar todos produtos
router.get("/", ProdutosController.listarTodos);

// Rota listar produto por ID
router.get("/listar/:id", ProdutosController.listarPorId);

// Rota atualizar produto por ID
router.put("/atualizar/:id", ProdutosController.atualizar);

// Rota deletar produto por ID
router.delete("/deletar/:id", ProdutosController.deletarPorId);

// Rota buscar produto por nome ou marca
router.get("/buscar", ProdutosController.buscarPorNomeOuMarca);

// Movimentar estoque
router.patch("/estoque/:id", ProdutosController.movimentarEstoque);

export default router;
