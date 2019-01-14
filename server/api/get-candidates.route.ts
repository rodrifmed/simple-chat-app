import { Request, Response } from "express";
import container from "../config/inversify-config";
import INVERSIFY_TYPES from "../config/inversify-types";
import { IDataBase } from "../database/IDataBase";

export function getCandidates(req: Request, res: Response) {

    try {

        const params = req.params;
        const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);

        const candidates = db.findCandidatesByUserId(params.userId);
        res.status(200).json({ candidates: candidates });

    } catch (ex) {
        res.sendStatus(403);
    }
}
