import * as bcryptjs from 'bcryptjs';

const salt = 12;

export const createHash = (payload: string) => {
    return bcryptjs.hash(payload, salt);
};

export const verifyHash = (initialValue: string, hash: string) => {
    return bcryptjs.compare(initialValue, hash);
}