import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Message } from '../model/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    chatId: string;
    userEmail: string;

    chatMessages: Message[];
    form: FormGroup;

    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private chatService: ChatService,
        private route: ActivatedRoute) {
        this.form = this.fb.group({
            message: ['', Validators.required]
        });
    }

    ngOnInit() {

        this.authService.user$.subscribe(user => {
            this.userEmail = user.email;
        });

        this.route.params.subscribe(params => {
            this.chatId = params['id'];

            this.chatService.emitJoinChat(this.chatId);

            this.chatService.currenctChat$.subscribe((data) => {
                this.chatMessages = data;
            });
        });
    }

    sendMessage() {
        const val = this.form.value;
        if (val.message) {
            const msg: any = {};

            msg.chatId = this.chatId;
            msg.message = val.message;
            msg.name = this.userEmail;

            this.chatService.emitSendMsg(msg);
        }
    }


}









