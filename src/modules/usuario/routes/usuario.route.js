import express from "express";
import UsuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

// Cadastrar usuário, listar todos e deletar todos
router.get("/ListarUsuarios", UsuarioController.listarTodos); // GET /usuarios
router.post("/CadastrarUsuarios", UsuarioController.cadastrar); // POST /usuarios
router.delete("/DeletarUsuarios", UsuarioController.deletarTodos); // DELETE /usuarios

// Contar total de usuários
router.get("/TotalUsuarios/total", UsuarioController.totalUsuarios); // GET /usuarios/total

// Listar, atualizar e deletar usuário por ID
router.get("/ListarUsuario/:id", UsuarioController.listarPorId); // GET /usuarios/:id
router.patch("/AtualizarUsuario/:id", UsuarioController.atualizar); // PATCH /usuarios/:id
router.delete("/DeletarUsuario/:id", UsuarioController.deletarPorId); // DELETE /usuarios/:id

export default router;
