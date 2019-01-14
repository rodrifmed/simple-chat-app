import { DbMessage } from "../../model/DbMessage";
import container from "../../config/inversify-config";
import INVERSIFY_TYPES from "../../config/inversify-types";
import { IDataBase } from "../../database/IDataBase";
import * as moment from 'moment';
import * as uuid from 'uuid';
import { io } from "../../server";

const db = container.get<IDataBase>(INVERSIFY_TYPES.IDataBase);

export function emitUpdateChatList(userId:string) {
    console.log("emitUpdateChatList");
    io.to(userId).emit('update-chat-list', db.findChatsByUserId(userId));
}

export function emitUpdateWallet(userId:string) {
    console.log("emitUpdateWallet");
    io.to(userId).emit('update-wallet', db.findWalletByUserId(userId));
}

export function initSocket() {
    

    io.on('connection', function (socket: any) {

        console.log('a user connected');

        socket.on('join-user', function (userId: string) {
            socket.join(userId);
            socket.room = userId;
        });

        // socket per chat
        // used to update chat msgs
        socket.on('join-room', function (chatId: string) {
            socket.join(chatId);
            socket.room = chatId;

            const messages = db.findMessagesByChatId(chatId);

            io.to(socket.room).emit('update-chat', messages);
        });

        socket.on('leave-room', function (chatId: string) {
            console.log("leave-room", chatId);
            socket.leave(chatId);
        });

        socket.on('send-msg', function (data: DbMessage) {

            data.timestamp = Number(moment());
            data.id = "m" + uuid();

            const messages = db.insertMessage(data);

            io.to(socket.room).emit('update-chat', messages);
        });

        socket.on('disconnect', function () {
            socket.leave(socket.room);
        });

    });
}

