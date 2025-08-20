import { DataTypes } from 'sequelize';
import sequelize from '../../../../config/database.js';

const ClienteModel = sequelize.define(
    'Cliente', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validade: {
                len: {
                    args: [2, 100],
                    msg: 'Seu nome deve ter entre 2 e 100 caracteres.'
                }, 
                notEmpty: {
                    msg: 'O campo "nome" deve ser preenchido!'
                },
                is: {
                    args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
                    msg: 'O nome não pode ter caracteres especiais.'
                }
            }
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^[0-9\s]+$/,
                    msg: 'O telefone deve conter apenas números.'
                },
                len: {
                    args: [10, 15],
                    msg: 'O telefone deve ter entre 10 e 15 caracteres.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: {
                    msg: 'O e-mail deve ser um endereço de e-mail válido.'
                }
            }
        },
        data_nascimento: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: 'A data de nascimento deve ser uma data válida.'
                }
            }
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: 'O campo "endereço" deve ser preenchido!'
                }
            }
        }
    },

    {
        tableName: 'Cliente',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        deletedAt: 'deletado_em'
    }
);

export default ClienteModel;