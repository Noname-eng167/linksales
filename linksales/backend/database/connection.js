import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Define variáveis com fallback (segurança caso o .env falhe)
const DB_NAME = process.env.DB_NAME || 'linksales'; // <--- AQUI ESTAVA O PROBLEMA PROVAVELMENTE
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 3306;

console.log(`🔄 Tentando conectar ao banco: '${DB_NAME}' em ${DB_HOST}...`);

const sequelize = new Sequelize(
  DB_NAME, // 1. O nome do banco deve ser o primeiro argumento
  DB_USER, 
  DB_PASS, 
  {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
    define: {
      freezeTableName: true
    },
    logging: false, // Mude para console.log se quiser ver o SQL cru
    dialectOptions: {
        // Garante que o driver force a seleção do banco
        connectTimeout: 60000
    }
  }
);

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    console.log(`📂 Banco Selecionado: ${DB_NAME}`);
  } catch (error) {
    console.error('❌ Erro fatal ao conectar ao banco de dados:', error.message);
    // Se o erro for "No database selected", significa que o banco 'linksales' não existe no MySQL
    if (error.original && error.original.code === 'ER_BAD_DB_ERROR') {
        console.error(`⚠️ O banco de dados '${DB_NAME}' não existe. Crie-o no Workbench!`);
    }
  }
}

export { connectDatabase, sequelize };