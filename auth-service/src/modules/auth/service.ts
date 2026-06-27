import { hashPassword} from "../../utils/hash.util.js";

export interface RegisterUserInput {
    firstName: string;
    lastName: string;
    email: string;
    rawPassword: string;
}

export const registerUserService = async (input: RegisterUserInput) => {
    const { firstName, lastName, email, rawPassword } = input;
    const securePasswordHash = await hashPassword(rawPassword);
    const stagedUserRecord = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: securePasswordHash,
        kycTier: 'TIER_0_UNVERIFIED'
    };
    return stagedUserRecord;
};