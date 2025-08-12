import express from "express";
import UsuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

// Cadastrar usuário, listar todos e deletar todos
router.get("/usuarios", UsuarioController.listarTodos); // GET /usuarios
router.post("/usuarios", UsuarioController.cadastrar); // POST /usuarios
router.delete("/usuarios", UsuarioController.deletarTodos); // DELETE /usuarios

// Contar total de usuários
router.get("/usuarios/total", UsuarioController.totalUsuarios); // GET /usuarios/total

// Listar, atualizar e deletar usuário por ID
router.get("/usuarios/:id", UsuarioController.listarPorId); // GET /usuarios/:id
router.patch("/usuarios/:id", UsuarioController.atualizar); // PATCH /usuarios/:id
router.delete("/usuarios/:id", UsuarioController.deletarPorId); // DELETE /usuarios/:id

export default router;
