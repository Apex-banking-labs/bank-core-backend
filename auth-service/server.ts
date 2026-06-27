import Fastify from "fastify";
import type { FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import { authRoutes } from './src/modules/auth/route.js';

const fastify: FastifyInstance = Fastify({ logger: true});
fastify.register(authRoutes, { prefix: '/auth'})
fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return { status: 'OK', service: 'auth-service'};
});

const start = async (): Promise<void> => {
    try {
        await fastify.listen({ port: 8081, host: '0.0.0.0'});
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();