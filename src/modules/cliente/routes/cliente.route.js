import express from 'express';
import ClienteController from '../controllers/cliente.controller.js';

const router = express.Router();

router.post("/cadastrar", ClienteController.criar);

router.get("/listar", ClienteController.listarTodos);

router.get('/listar/:id', ClienteController.ListarPorId);

router.get('/listar/email/:email', ClienteController.ListarPorEmail);

router.get('/listar/telefone/:telefone', ClienteController.ListarPorTelefone);

router.patch('/atualizar/:id', ClienteController.atualizar);

router.delete('/deletar/:id', ClienteController.deletarPorId);

router.get('/total', ClienteController.TotalClientes);

export default router;