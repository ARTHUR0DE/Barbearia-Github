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
      allowNull: true,
      validate: {
        len: [2, 100],
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
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20, 255],
      },
    },
  },
  {
    tableName: "produtos",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

export default ProdutosModel;
