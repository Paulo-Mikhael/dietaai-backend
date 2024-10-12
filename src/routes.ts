import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutrition } from "./controllers/CreateNutrition";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    const responseText =
      '```json\n{\n  "nome": "Leticia",\n  "sexo": "Feminino",\n  "idade": 23,\n  "altura": 1.45,\n  "peso": 50,\n  "objetivo": "Emagrecer",\n  "refeicoes": [\n    {\n      "horario": "07:00",\n      "nome": "Cafe da Manha",\n      "alimentos": [\n        "1 fatia de pao integral",\n        "1 colher de sopa de azeite de oliva",\n        "1 ovo cozido",\n        "1 copo de leite desnatado",\n        "1 banana",\n        "1 xícara de café preto"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da Manha",\n        "alimentos": [\n        "1 iogurte grego natural desnatado",\n        "1/2 xícara de frutas vermelhas"\n      ]\n    },\n    {\n      "horario": "12:30",\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xícara de arroz integral",\n        "1 xícara de brócolis cozido",\n        "1 salada de folhas verdes com tomate e azeite de oliva"\n      ]\n    },\n    {\n      "horario": "15:30",\n      "nome": "Lanche da Tarde",\n        "alimentos": [\n        "1 xícara de chá verde",\n        "1 fatia de queijo minas",\n        "1 maça"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe grelhado",\n        "1 batata doce cozida",\n        "1 xícara de couve refogada"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Proteína do soro do leite",\n    "Creatina",\n    "Ômega 3"\n  ]\n}\n```';

    try {
      const jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      const jsonObject = JSON.parse(jsonString);

      return reply.send({ data: jsonObject });
    } catch (error) {
      console.log(error);
    }
  });

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const route = new CreateNutrition();

      return route.handle(request, reply);
    }
  );
}
