import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class WalletService {

    private subject = new Subject<any>();
    wallet$: Observable<any> = this.subject.asObservable();

    constructor(private http: HttpClient, private socket: Socket) {
        this.onUserChatListChange();
    }

    getWallet(userId: string): any {
        return this.http.get<any>('/api/wallet/' + userId);
    }

    onUserChatListChange(): any {
        this.socket.on('update-wallet', (data: any) => {
            this.subject.next(data);
        });
    }

}
