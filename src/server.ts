import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = Fastify({ logger: true });
dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

app.setErrorHandler((error, request, reply) => {
  // Retorna uma mensagem em formato JSON caso ocorra um erro
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors);
  app.register(routes);
  app.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.1",
      info: {
        title: "API geradora de dietas com Inteligência Artificial",
        description:
          "API para a criação de dietas personalizadas com IA, feita para uma aplicação mobile chamada Dieta.AI feita durante as aulas do Sujeito Programador de Node e React Native.",
        version: "1.0.0",
        contact: {
          name: "Meu Portifolio",
          url: "https://portifolio-react-three.vercel.app/",
        },
      },
      externalDocs: {
        description: "Github do Projeto",
        url: "https://github.com/Paulo-Mikhael/dietaai-backend?tab=readme-ov-file#readme",
      },
      servers: [
        {
          url: "http://localhost:3333",
          description: "API de dietas",
        },
      ],
      paths: {
        "/create": {
          post: {
            summary: "Cria uma dieta personalizada",
            tags: ["Dietas"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/create-diet",
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Sucesso",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/diet",
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          diet: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  nome: {
                    type: "string",
                    description: "Nome da pessoa que gerou a dieta",
                  },
                  sexo: {
                    type: "string",
                    description: "Sexo da pessoa que gerou a dieta",
                  },
                  idade: {
                    type: "number",
                    description: "Idade da pessoa que gerou a dieta",
                  },
                  altura: {
                    type: "number",
                    description: "Altura da pessoa que gerou a dieta",
                  },
                  peso: {
                    type: "number",
                    description: "Peso da pessoa que gerou a dieta",
                  },
                  objetivo: {
                    type: "string",
                    description: "Objetivo da pessoa que gerou a dieta",
                  },
                  refeicoes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        horario: {
                          type: "string",
                          description: "Horário da refeição recomendada",
                        },
                        nome: {
                          type: "string",
                          description: "Nome da refeição recomendada",
                        },
                        alimentos: {
                          type: "array",
                          items: {
                            type: "string",
                            description:
                              "Alimentos recomendados para essa refeição",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "create-diet": {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Nome da pessoa para gerar a dieta",
                example: "Paulo Miguel Bentes do Nascimento",
              },
              weight: {
                type: "string",
                description: "Peso da pessoa para gerar a dieta",
                example: "68",
              },
              height: {
                type: "string",
                description: "Altura da pessoa para gerar a dieta",
                example: "1.80",
              },
              age: {
                type: "string",
                description: "Idade da pessoa para gerar a dieta",
                example: "18",
              },
              gender: {
                type: "string",
                description: "Gênero da pessoa para gerar a dieta",
                example: "masculino",
              },
              objective: {
                type: "string",
                description: "Objetivo da pessoa para gerar a dieta",
                example: "Hipertrofia",
              },
              level: {
                type: "string",
                description:
                  "Nível de atividade física da pessoa para gerar a dieta",
                example: "Moderadamente ativo",
              },
            },
          },
        },
      },
    },
  });
  app.register(fastifySwaggerUi, swaggerUiOptions);

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log("Servidor rodando em http://localhost:3333");
  } catch (error) {
    console.log(error);
  }
};

start();
