import ProdutosModel from '../models/produto.model.js';

class ProdutosController {
  static async cadastrar(req, res) {
    try {
      const { nome, marca, preco, quantidade_estoque, descricao } = req.body;

      if (!nome || !preco || !descricao) {
        return res.status(400).json({
          mensagem: "Campos obrigatórios: nome, preco e descricao.",
        });
      }

      const novoProduto = await ProdutosModel.create({
        nome,
        marca,
        preco,
        quantidade_estoque,
        descricao,
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
      const { nome, marca, preco, quantidade_estoque, descricao } = req.body;
      const id = req.params.id;

      const atualizado = await ProdutosModel.update(
        { nome, marca, preco, quantidade_estoque, descricao },
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
}

export default ProdutosController;
