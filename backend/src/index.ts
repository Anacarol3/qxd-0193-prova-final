import cors from "cors";
import express from "express";
import "reflect-metadata";
import winston from "winston";
import { AppDataSource } from "./ormconfig";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT || 3000;

try {
  AppDataSource.initialize();

  const { combine, timestamp, json, printf } = winston.format;
  const timestampFormat = "MMM-DD-YYYY HH:mm:ss";

  const logger = winston.createLogger({
    format: combine(
      timestamp({ format: timestampFormat }),
      json(),
      printf(({ timestamp, level, message, ...data }) => {
        const response = {
          level,
          message,
          data, // metadata
        };

        return JSON.stringify(response);
      })
    ),
  });

  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rotas
  app.use("/", authRoutes);
  app.use("/users", userRoutes);

  app.use("/projects", projectRoutes);

  app.get("/", (req, res) => {
    console.log("dasdasdada");
    res.json({ msg: "dasdas" });
  });

  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
} catch (error) {
  console.log("Erro ao conectar no banco de dados", error);
}
