import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

    userId: number;
    candidates: User[] = [];

    constructor(private authService: AuthService, private chatService: ChatService, private router: Router) {
    }

    ngOnInit() {

        this.authService.user$.subscribe(user => {
            this.userId = user.id;

            if (this.userId) {

                this.chatService.getCandidates(this.userId.toString()).subscribe(response => {
                    this.candidates = response.candidates;
                });
            }

        });


    }

    createChat(candidateId: number) {
        this.chatService.creatChat(this.userId.toString(), candidateId.toString()).subscribe(() => {
            this.router.navigateByUrl('/');
        });
    }


}









