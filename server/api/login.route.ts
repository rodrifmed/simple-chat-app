import { Request, Response } from "express";
import * as argon2 from 'argon2';
import container from "../config/inversify-config";
import INVERSIFY_TYPES from "../config/inversify-types";
import { IDataBase } from "../database/IDataBase";
import { DbUser } from "../model/DbUser";
import { createSessionToken } from "./security/security.utils";


export function login(req: Request, res: Response) {

    const credentials = req.body;
    const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);
    const user = db.findUserByEmail(credentials.email);

    if (!user) {
        res.sendStatus(403);
    } else {
        loginAndBuildResponse(credentials, user, res);
    }

}

async function loginAndBuildResponse(credentials: any, user: DbUser, res: Response) {

    try {
        const sessionToken = await attemptLogin(credentials, user);

        res.cookie("SESSIONID", sessionToken, { httpOnly: true });
        res.status(200).json({ id: user.id, email: user.email, role: user.role });

    } catch (err) {
        console.log("Login failed:", err);
        res.sendStatus(403);
    }
}


async function attemptLogin(credentials: any, user: DbUser) {

    const isPasswordValid = await argon2.verify(user.passwordDigest,
        credentials.password);

    if (!isPasswordValid) {
        throw new Error("Password Invalid");
    }

    return createSessionToken(user);
}
















