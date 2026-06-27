import type { FastifyInstance} from "fastify";
import { signUpSchema} from "./dto.js";
import { registerUserController } from "./controller.js";

export const authRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/signup', signUpSchema, registerUserController);
};