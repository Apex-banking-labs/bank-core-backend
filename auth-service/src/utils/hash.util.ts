import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (plainText: string): Promise<string> => {
    const hashedString = await bcrypt.hash(plainText, SALT_ROUNDS);
    return hashedString;
}