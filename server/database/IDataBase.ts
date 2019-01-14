import { DbMessage } from "../model/DbMessage";
import { DbChat } from "../model/DbChat";

export interface IDataBase {

    initDB(): any;
    getDB(): any;
    findUserByEmail(email: any): any;
    findUserById(sub: any): any;
    findChatsByUserId(userId: string): DbChat[];
    findMessagesByChatId(chatId: any): any;
    findCandidatesByUserId(userId: any): any;
    insertMessage(message: DbMessage): any;
    createChat(email: string, candidateEmail: string): any;
    addChatToUsers(chatId: any, ids: number[]): any;
    findWalletByUserId(userId: any): number;
    updateWallet(userId: any, value: number): void;
    updateVitayWallet(): void;
}