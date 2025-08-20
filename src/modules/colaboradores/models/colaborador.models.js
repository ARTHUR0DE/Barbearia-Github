import { DataTypes } from 'sequelize'
import sequelize from '../../../../config/database';

const ColaboradorModel = sequelize.define(
  "Colaborador",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: "O nome deve ter entre 2 e 100 caracteres!"
        },
        notEmpty: {
          msg: "O campo nome deve ser preenchido!"
        },
        is: {
          args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
          msg: "O nome não deve conter caracteres especiais!"
        }
      }
    },
    especialidade: {

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Este e-mail já está cadastrado!"
      },
      validate: {
        notEmpty: {
          msg: "O campo e-mail deve ser preenchido!"
        },
        isEmail: {
          msg: "O e-mail deve ser válido!"
        }
      }
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O campo senha deve ser preenchido!"
        },
        len: {
          args: [8],
          msg: "A senha deve ter no mínimo 8 caracteres!"
        }
      }
    },
    data_admissao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Insira uma data de admissão válida!"
        }
      }
    },
    status: {

    }
  },
  {
    tableName: "usuario",
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
);

export default ColaboradorModel;