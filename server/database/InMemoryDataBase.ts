import { injectable } from "inversify";
import { IDataBase } from "./IDataBase";
import * as _ from 'lodash';
import * as argon2 from 'argon2';
import { DbUser } from "../model/DbUser";
import { USERS, CHATS, USERS_PER_CHAT, CHATS_PER_USER, MESSAGES_PER_CHAT, WALLET } from "../demo/database-data-mock";
import { DbChat } from "../model/DbChat";
import { DbMessage } from "../model/DbMessage";
import * as moment from 'moment';
import * as uuid from 'uuid';

@injectable()
export class InMemoryDataBase implements IDataBase {


    users: DbUser[] = [];

    initDB() {
        this.initUsers();
    }

    getDB() {
        return this;
    }

    findUserByEmail(email: string): DbUser {
        const user = _.find(this.users, user => user.email === email);
        return user;
    }

    findUserById(userId: string): DbUser {
        let user = undefined;
        if (userId) {
            user = _.find(this.users, user => user.id.toString() === userId);
        }
        return user;
    }

    findChatsByUserId(userId: string): DbChat[] {
        let chatsIds: string[] = []
        let dbChats: DbChat[] = []
        let chatsPerUser = _.get(CHATS_PER_USER, userId);

        if (chatsPerUser) {
            chatsIds = _.keys(chatsPerUser);
        }

        for (const chatId of chatsIds) {
            const chat = _.get(CHATS, chatId);

            const dbChat: DbChat = {
                id: chatId,
                title: chat.title,
                timestamp: chat.timestamp
            };

            dbChats.push(dbChat);
        }

        return dbChats;
    }

    findMessagesByChatId(chatId: string) {
        const messagesByChatId = _.get(MESSAGES_PER_CHAT, chatId);
        return _.values(messagesByChatId);
    }

    insertMessage(message: DbMessage): DbMessage[] {
        const chatId = message.chatId;
        const msgId = message.id;

        if (!MESSAGES_PER_CHAT[chatId]) {
            MESSAGES_PER_CHAT[chatId] = {};
        }

        MESSAGES_PER_CHAT[chatId][msgId] = message;

        return _.values(_.get(MESSAGES_PER_CHAT, chatId));
    }

    createChat(email: string, candidateEmail: string) {

        const chatId = "m" + uuid();

        let newChat: DbChat = {
            timestamp: Number(moment()),
            id: chatId,
            title: email + "/" + candidateEmail
        }

        CHATS[chatId] = newChat;

        return chatId;
    }

    addChatToUsers(chatId: any, ids: number[]) {
        for (const id of ids) {
            if (!CHATS_PER_USER[id]) {
                CHATS_PER_USER[id] = {}
            }
            CHATS_PER_USER[id][chatId] = true;

            if (!USERS_PER_CHAT[chatId]) {
                USERS_PER_CHAT[chatId] = {};
            }
            USERS_PER_CHAT[chatId][id] = true;
        }
    }



    findCandidatesByUserId(userId: any): DbUser[] {
        let candidates: DbUser[] = [];
        let userCandidatesIds: any[] = [];
        let candidatesIds: string[] = [];
        try {

            const chatsIds: DbChat[] = this.findChatsByUserId(userId);

            console.log("chatsIds", chatsIds);

            for (let chatId of chatsIds) {
                if (USERS_PER_CHAT[chatId.id]) {
                    userCandidatesIds = _.concat(userCandidatesIds, _.keys(USERS_PER_CHAT[chatId.id]));
                }
            }

            candidatesIds = _.filter(_.keys(USERS), id => !_.includes(userCandidatesIds, id.toString()))

            for (let candidatesId of candidatesIds) {
                candidates.push(this.findUserById(candidatesId));
            }

            return candidates;

        } catch (ex) {
            console.log("ex", ex);
            return candidates
        }

    }

    findWalletByUserId(userId: string): number {
        const user = this.findUserById(userId);
        return WALLET[user.wallet];
    }

    updateWallet(userId: string, value: number) {
        const user: DbUser = this.findUserById(userId);
        WALLET[user.wallet].value = WALLET[user.wallet].value + value;
        console.log("wallet[user]", WALLET[user.wallet]);
    }

    updateVitayWallet() {
        WALLET["wvitay"].value = WALLET["wvitay"].value + 1;
    }

    async initUsers() {
        const usersExample = _.values(USERS);

        for (const user of usersExample) {
            const passwordDigest = await argon2.hash(user.password);

            user[passwordDigest] = passwordDigest;

            const newUser: DbUser = {
                id: user.id,
                email: user.email,
                passwordDigest: passwordDigest,
                role: user.role,
                wallet: user.wallet
            };

            this.users.push(newUser);
        }
    }


}