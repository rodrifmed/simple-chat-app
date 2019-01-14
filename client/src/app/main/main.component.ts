import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { Chat } from '../model/chat';
import { WalletService } from '../services/wallet.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    user$: Observable<User>;
    chats: Chat[] = [];
    user: User;
    wallet: number;

    constructor(private authService: AuthService,
        private chatService: ChatService,
        private walletService: WalletService,
        private router: Router) {

    }

    ngOnInit() {
        this.user$ = this.authService.user$;
        this.init();
    }

    async init() {
        await this.user$.subscribe(user => {
            console.log(user);
            this.user = user;
        });

        await this.chatService.getChats(this.user.id.toString()).subscribe(response => {
            console.log(response);
            this.chats = response.chats;
        });

        this.chatService.chatList$.subscribe(response => {
            console.log(response);
            this.chats = response;
        });

        this.walletService.getWallet(this.user.id.toString()).subscribe(response => {
            this.wallet = response.wallet.value;
        });

        this.walletService.wallet$.subscribe(response => {
            this.wallet = response.value;
        });

    }

    openCreateChat() {
        this.router.navigateByUrl('/candidates');
    }

    openChat(chatId: string) {
        this.router.navigate(['/chat', chatId]);
    }

    logout() {
        this.authService.logout().subscribe(() => {
            console.log('User is logged out');
            this.router.navigateByUrl('/');
        });
    }
}









