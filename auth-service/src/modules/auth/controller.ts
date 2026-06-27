import type { FastifyRequest, FastifyReply} from "fastify";
import { registerUserService} from "./service.js";

interface SignUpBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const registerUserController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const body = request.body as SignUpBody;

        const stagedUserRecord = await registerUserService({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            rawPassword: body.password
        });

        return reply.status(201).send({
            message: 'User workspace initialized successfully.',
            user: {
                firstName: stagedUserRecord.firstName,
                lastName: stagedUserRecord.lastName,
                email: stagedUserRecord.email,
                kycTier: stagedUserRecord.kycTier
            }
        });

    } catch (error) {
        request.log.error(error, 'Sign-up transaction failure.');
        return reply.status(500).send({
            error: 'Internal Server Error',
            message: 'Secure processing failed.'
        });
    }
};