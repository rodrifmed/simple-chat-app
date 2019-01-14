import { Request, Response } from "express";
import container from "../config/inversify-config";
import INVERSIFY_TYPES from "../config/inversify-types";
import { IDataBase } from "../database/IDataBase";

export function getChatsUser(req: Request, res: Response) {

    try {
        
        const params = req.params;
        const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);
        const chats = db.findChatsByUserId(params.userId);
        res.status(200).json({ chats: chats });

    } catch (ex) {
        res.sendStatus(403);
    }
}
