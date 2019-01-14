
import { Application } from "express";
import container from "../config/inversify-config";
import INVERSIFY_TYPES from "../config/inversify-types";
import { IDataBase } from "../database/IDataBase";
import { checkIfAuthenticated } from "./middlewares/authentication.middleware";
import { logout } from "./logout.route";
import { login } from "./login.route";
import { getUser } from "./get-user.route";
import { getChatsUser } from "./get-chats-user.route";
import { createChat } from "./create-chat.route";
import { getCandidates } from "./get-candidates.route";
import { getWallet } from "./get-wallet.route";

export function initApi(app: Application) {

    const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);
    db.initDB();

    app.route('/').get((req, res) => res.status(200).json({ payload: "Hello World" }));
    app.route('/api/login').post(login);
    app.route('/api/logout').post(checkIfAuthenticated, logout);
    app.route('/api/user').get(getUser);
    app.route('/api/candidates/:userId').get(checkIfAuthenticated, getCandidates);
    app.route('/api/chat/:userId').get(checkIfAuthenticated, getChatsUser);
    app.route('/api/chat').post(checkIfAuthenticated, createChat);
    app.route('/api/wallet/:userId').get(checkIfAuthenticated, getWallet);
}