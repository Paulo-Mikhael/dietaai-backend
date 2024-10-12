import type { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionService } from "../services/CreateNutritionService";

export interface DataProps {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
}

class CreateNutrition {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as DataProps;

    const createNutrition = new CreateNutritionService();

    const nutrition = await createNutrition.execute(body);

    reply.send(nutrition);
  }
}

export { CreateNutrition };
