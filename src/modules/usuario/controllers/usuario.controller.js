import bcrypt from "bcryptjs";
import UsuarioModel from "../models/usuario.model.js";

class UsuarioController {
  // Cadastrar usuário
  static async cadastrar(req, res) {
    try {
      const { id ,nome_usuario,  senha_hash, tipo_usuario, ativo, ultimo_login } = req.body;
      if (!nome_usuario || !senha_hash || !tipo_usuario ) {
        return res
          .status(400)
          .json({ mensagem: "Todos os campos devem ser preenchidos" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(senha_hash, salt);
      await UsuarioModel.create({ id, nome_usuario,  senha_hash:hash, tipo_usuario, ativo, ultimo_login });

      res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar todos os usuários
  static async listarTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll({
        attributes: {
          exclude: ["senha_hash"],
        },
      });
      if (!usuarios || usuarios.length === 0) {
        return res.status(200).json({ mensagem: "Banco de dados vazio!" });
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar usuário por ID
  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findByPk(id, {
        attributes: { exclude: ["senha_hash"] }
      });
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Atualizar usuário por ID
  static async atualizar(req, res) {
  try {
    const { nome_usuario, senha_hash, tipo_usuario, ativo } = req.body;
    const { id } = req.params;

    const dadosAtualizar = {};
    if (nome_usuario !== undefined) dadosAtualizar.nome_usuario = nome_usuario;
    if (tipo_usuario !== undefined) dadosAtualizar.tipo_usuario = tipo_usuario;
    if (ativo !== undefined) dadosAtualizar.ativo = ativo;

    if (senha_hash !== undefined) {
      const salt = await bcrypt.genSalt(10);
      dadosAtualizar.senha_hash = await bcrypt.hash(senha_hash, salt);
    }

    const resultado = await UsuarioModel.update(dadosAtualizar, { where: { id } });

    if (resultado[0] === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }
    res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro interno do servidor.", erro: error.message });
  }
}

  // Deletar usuário por ID
  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await UsuarioModel.destroy({ where: { id } });
      if (!resultado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json({ mensagem: "Usuário excluído com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar todos os usuários
  static async deletarTodos(req, res) {
    try {
      await UsuarioModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os usuários foram deletados!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Contar total de usuários
  static async totalUsuarios(req, res) {
    try {
      const total = await UsuarioModel.count();
      res.status(200).json({ total });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default UsuarioController;
