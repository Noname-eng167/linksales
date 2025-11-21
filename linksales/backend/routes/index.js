import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// rota base
app.get("/", (_req, res) => {
  res.send("Servidor LinkSales funcionando!");
});

// conectando os módulos de rotas
app.use("/users", userRoutes);
app.use("/products", productRoutes);

export default app;