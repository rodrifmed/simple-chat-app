import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import { DbUser } from "../../model/DbUser";

const RSA_PRIVATE_KEY = fs.readFileSync('./demo/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./demo/public.key');
const SESSION_DURATION = 7200;

export async function createSessionToken(user: DbUser) {

    const token = await jwt.sign({
        roles: user.role
    }, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: SESSION_DURATION,
            subject: user.id.toString()
        });

    return token;
}

export async function decodeJwt(token: string) {
    const payload = await jwt.verify(token, RSA_PUBLIC_KEY);
    return payload;
}













