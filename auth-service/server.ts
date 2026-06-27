import Fastify from "fastify";
import type { FastifyInstance, FastifyRequest, FastifyReply} from "fastify";

const fastify: FastifyInstance = Fastify({ logger: true});
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