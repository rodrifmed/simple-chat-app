import { Request, Response } from "express";
import container from "../config/inversify-config";
import INVERSIFY_TYPES from "../config/inversify-types";
import { IDataBase } from "../database/IDataBase";
import { DbUser } from "../model/DbUser";
import { emitUpdateChatList, emitUpdateWallet } from "./socket/socket-manager";
/*
    params: email, candidateEmail
*/
export function createChat(req: Request, res: Response) {
    try {
        const params = req.body;
        const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);
        const user = db.findUserById(params.userId);
        const candidate = db.findUserById(params.candidateId);

        console.log("candidate", candidate)

        if (!user || !candidate) {
            res.sendStatus(403);
        } else {
            createChatAndBuildResponse(user, candidate, db, res);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(403);
    }

}

async function createChatAndBuildResponse(user: DbUser, candidate: DbUser, db: IDataBase, res: Response) {

    try {

        const chatId = db.createChat(user.email, candidate.email);

        const ids: number[] = [];
        ids.push(user.id);
        ids.push(candidate.id);

        db.addChatToUsers(chatId, ids);
        db.updateWallet(user.id.toString(), -2);
        db.updateWallet(candidate.id.toString(), 1);
        db.updateVitayWallet();

        const chats = db.findChatsByUserId(user.id.toString());
        res.status(200).json({ chats: chats });

        emitUpdateChatList(user.id.toString());
        emitUpdateChatList(candidate.id.toString());
        emitUpdateWallet(user.id.toString());
        emitUpdateWallet(candidate.id.toString());

    } catch (err) {
        console.log("Create Chat failed:", err);
        res.sendStatus(403);
    }
}