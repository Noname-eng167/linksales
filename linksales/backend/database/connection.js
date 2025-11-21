import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// Carrega variáveis de ambiente do arquivo .env

const DATABASE_NAME = process.env.DB_NAME || 'linksales';
const DATABASE_USER = process.env.DB_USER || 'root'; 
const DATABASE_PASSWORD = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    define: {
      freezeTableName: true 
    },
    logging: false 
  }
);

// Teste de conexão
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log(' Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error(' Erro ao conectar ao banco de dados:', error.message);
    process.exit(1);
  }
}


export { connectDatabase, sequelize };