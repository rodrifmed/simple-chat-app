import { Request, Response } from "express";
import container from "../config/inversify-config";
import INVERSIFY_TYPES from "../config/inversify-types";
import { IDataBase } from "../database/IDataBase";

export function getWallet(req: Request, res: Response) {

    try {

        const params = req.params;
        const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);
        const wallet = db.findWalletByUserId(params.userId);
        console.log("wallet",wallet);
        res.status(200).json({ wallet: wallet });

    } catch (ex) {
        res.sendStatus(403);
    }
}
