import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

const app = Fastify({ logger: true }); // Inicia o fastify
dotenv.config(); // Pega as variáveis de ambiente em .env

app.setErrorHandler((error, request, reply) => {
  // Retorna uma mensagem em forma de json caso de error
  reply.code(400).send({ message: error.message });
});
