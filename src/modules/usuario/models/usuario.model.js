import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const UsuarioModel = sequelize.define(
  "Usuario",
  {
    id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

    nome_usuario: {
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

    senha_hash: {
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
    
    tipo_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          msg: "O campo tipo de usuário deve ser preenchido!",
    isIn: {
      args: [['admin', 'cliente', 'funcionario']], // ajuste conforme os tipos permitidos
      msg: "O tipo de usuário deve ser 'admin', 'cliente' ou 'funcionario'!"
        }
    }
  ,

    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
    notNull: {
      msg: "O campo 'ativo' deve ser preenchido!"
        }
    }
},

    ultimo_login: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: "O campo 'último login' deve ser uma data válida!"
    }
    }
  }
},
  },
  
  {
    tableName: "usuario",
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
);


export default UsuarioModel;
