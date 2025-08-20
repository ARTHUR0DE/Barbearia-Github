import ProdutosModel from '../models/produto.model.js';
import { Op } from "sequelize";

class ProdutosController {
  static async cadastrar(req, res) {
    try {
      const { nome, marca, preco, quantidade_estoque, descricao, categoria } = req.body;

      // Todos os campos obrigatórios
      if (!nome || !marca || !preco || quantidade_estoque === undefined || !descricao || !categoria) {
        return res.status(400).json({
          mensagem: "Campos obrigatórios: nome, marca, preco, quantidade_estoque, descricao e categoria.",
        });
      }

      // Validação para quantidade_estoque
      if (quantidade_estoque < 0) {
        return res.status(400).json({
          mensagem: "Quantidade em estoque não pode ser negativa.",
        });
      }

      const novoProduto = await ProdutosModel.create({
        nome,
        marca,
        preco,
        quantidade_estoque,
        descricao,
        categoria,
      });

      res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        produto: novoProduto,
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar produto.",
        erro: error.message,
      });
    }
  }

  static async listarTodos(req, res) {
    try {
      const produtos = await ProdutosModel.findAll();

      if (produtos.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum produto encontrado." });
      }

      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar produtos.",
        erro: error.message,
      });
    }
  }

  static async listarPorId(req, res) {
    try {
      const id = req.params.id;
      const produto = await ProdutosModel.findByPk(id);

      if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
      }

      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar produto.",
        erro: error.message,
      });
    }
  }

  static async atualizar(req, res) {
    try {
      const { nome, marca, preco, quantidade_estoque, descricao, categoria } = req.body;
      const id = req.params.id;

      // Verificar se todos os campos estão presentes
      if (!nome || !marca || !preco || quantidade_estoque === undefined || !descricao || !categoria) {
        return res.status(400).json({
          mensagem: "Campos obrigatórios para atualização: nome, marca, preco, quantidade_estoque, descricao e categoria.",
        });
      }

      if (quantidade_estoque < 0) {
        return res.status(400).json({
          mensagem: "Quantidade em estoque não pode ser negativa.",
        });
      }

      const atualizado = await ProdutosModel.update(
        { nome, marca, preco, quantidade_estoque, descricao, categoria },
        { where: { id } }
      );

      if (atualizado[0] === 0) {
        return res.status(404).json({ mensagem: "Produto não encontrado para atualização." });
      }

      res.status(200).json({ mensagem: "Produto atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar produto.",
        erro: error.message,
      });
    }
  }

  static async deletarPorId(req, res) {
    try {
      const id = req.params.id;
      const deletado = await ProdutosModel.destroy({ where: { id } });

      if (!deletado) {
        return res.status(404).json({ mensagem: "Produto não encontrado para exclusão." });
      }

      res.status(200).json({ mensagem: "Produto excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir produto.",
        erro: error.message,
      });
    }
  }

  static async buscarPorNomeOuMarca(req, res) {
    try {
      const { nome, marca } = req.query;

      const whereClause = {};

      if (nome) {
        whereClause.nome = { [Op.like]: `%${nome}%` };
      }

      if (marca) {
        whereClause.marca = { [Op.like]: `%${marca}%` };
      }

      const resultados = await ProdutosModel.findAll({ where: whereClause });

      if (resultados.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum produto encontrado com os filtros fornecidos." });
      }

      res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar produtos.",
        erro: error.message,
      });
    }
  }
}

export default ProdutosController;
