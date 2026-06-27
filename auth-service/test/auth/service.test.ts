import { describe, it, expect } from 'vitest';
import { registerUserService } from "../../src/modules/auth/service.js";


describe('Authentication Service Domain', () => {
    it('should successfully securely hash the password and stage the user record', async () => {

        const mockInput = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            rawPassword: 'SuperSecretPassword123'
        };
        const result = await registerUserService(mockInput);

        expect(result.firstName).toBe(mockInput.firstName);
        expect(result.lastName).toBe(mockInput.lastName);
        expect(result.email).toBe(mockInput.email);
        expect(result.kycTier).toBe('TIER_0_UNVERIFIED');
        expect(result.passwordHash).toBeDefined();
        expect(result.passwordHash).not.toBe(mockInput.rawPassword);
        expect(result.passwordHash.startsWith('$2b$')).toBe(true);
    })
})