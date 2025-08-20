import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const ProdutosModel = sequelize.define(
  "produtos",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,  // mudou para obrigatório
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },
    preco: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
    quantidade_estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,  // mudou para obrigatório
      validate: {
        min: 0,
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20, 255],
        notEmpty: true,
      },
    },
    imagem_url: {
      type: DataTypes.STRING,
      allowNull: true,  // opcional
      validate: {
        isUrl: true,
      },
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "produtos",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

export default ProdutosModel;
