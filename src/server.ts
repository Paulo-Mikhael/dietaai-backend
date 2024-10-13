import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./routes";

const app = Fastify({ logger: true }); // Inicia o fastify
dotenv.config(); // Pega as variáveis de ambiente em .env

app.setErrorHandler((error, request, reply) => {
  // Retorna uma mensagem em forma de json caso de error
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors);
  app.register(routes);

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log("Servidor rodando em http://localhost:3333");
  } catch (error) {
    console.log(error);
  }
};

start();
