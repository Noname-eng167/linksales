import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import userRoutes from './routes/user.routes.js';
import { connectDatabase } from "./database/connection.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', userRoutes);

// rota base
app.get("/", (_req, res) => {
  res.send("Servidor LinkSales funcionando!");
});

// usa todas as rotas organizadas
app.use("/", routes);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT , () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha fatal ao iniciar o servidor ou conectar ao DB:", error);
  }
}

startServer();