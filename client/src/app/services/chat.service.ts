import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
import { Message } from '../model/message';
import { Chat } from '../model/chat';
import { User } from '../model/user';

@Injectable()
export class ChatService {

    private subject = new Subject<any>();
    currenctChat$: Observable<any> = this.subject.asObservable();
    currentChatId: string = undefined;

    private chatListSubject = new Subject<any>();
    chatList$: Observable<any> = this.chatListSubject.asObservable();

    constructor(private http: HttpClient, private socket: Socket) {
        console.log('ChatService constructor');
        this.onUserChatListChange();
    }

    getChats(userId: string): any {
        return this.http.get<Chat>('/api/chat/' + userId);
    }

    getCandidates(userId: string): any {
        return this.http.get<User>('/api/candidates/' + userId);
    }

    creatChat(userId: string, candidateId: string): any {
        return this.http.post('/api/chat', { userId, candidateId });
    }

    emitJoinChat(chatId: string) {

        if (this.currentChatId === chatId) {
            return;
        }

        if (this.currentChatId !== undefined) {
            this.socket.emit('leave-room', chatId);
        }

        this.currentChatId = chatId;
        this.socket.emit('join-room', chatId);
        this.onMsgChange();
    }

    emitSendMsg(message: Message) {
        this.socket.emit('send-msg', message);
    }

    onMsgChange() {
        this.socket.on('update-chat', (data: any) => {
            this.subject.next(data);
        });
    }

    onUserChatListChange(): any {
        this.socket.on('update-chat-list', (data: any) => {
            this.chatListSubject.next(data);
        });
    }
}
