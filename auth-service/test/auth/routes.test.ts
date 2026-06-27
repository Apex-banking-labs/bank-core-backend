
import { describe, it, expect, beforeEach } from 'vitest';
import Fastify from 'fastify';
import type { FastifyInstance } from "fastify";
import { authRoutes } from "../../src/modules/auth/route.js";

describe('Authentication HTTP Routes', () => {
    let app: FastifyInstance;

    beforeEach(async () => {
        app = Fastify();
        await app.register(authRoutes, { prefix: '/auth' });
    });


    const badPayloads = [
        { missingField: 'firstName', data: { lastName: 'Doe', email: 'hacker@example.com', password: 'SecurePassword123' } },
        { missingField: 'lastName', data: { firstName: 'John', email: 'hacker@example.com', password: 'SecurePassword123' } },
        { missingField: 'email', data: { firstName: 'John', lastName: 'Doe', password: 'SecurePassword123' } },
        { missingField: 'password', data: { firstName: 'John', lastName: 'Doe', email: 'hacker@example.com' } }
    ];

    badPayloads.forEach(({ missingField, data }) => {

        it(`should reject sign-up requests missing the ${missingField} field`, async () => {

            const response = await app.inject({
                method: 'POST',
                url: '/auth/signup',
                payload: data
            });


            expect(response.statusCode).toBe(400);

            const body = JSON.parse(response.payload);
            expect(body.message).toContain(`must have required property '${missingField}'`);
        });

    });
});