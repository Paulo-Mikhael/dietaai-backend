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
  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const route = new CreateNutrition();

      return route.handle(request, reply);
    }
  );
}
