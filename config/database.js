import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

async function sincronizar() {
  try {
    await sequelize.authenticate();
    console.log("Conexão realizada com sucesso!");
    await sequelize.sync({ force: false, alter: false });
    console.log("Tabelas criadas com sucesso");
  } catch (error) {
    console.error("Erro ao se conectar com o banco:", error.message);
  }
}

sincronizar();

export default sequelize;