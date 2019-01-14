import { Request, Response } from "express";
import container from "../config/inversify-config";
import INVERSIFY_TYPES from "../config/inversify-types";
import { IDataBase } from "../database/IDataBase";

export function getUser(req: Request, res: Response) {

    const userInfo = req["user"];
    if (userInfo) {
        const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);
        const user = db.findUserById(userInfo.sub);
        res.status(200).json({ email: user.email, id: user.id, role: user.role });
    } else {
        res.sendStatus(204);
    }
}
