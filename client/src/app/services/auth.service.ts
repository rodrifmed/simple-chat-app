
import { shareReplay, filter, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { Socket } from 'ngx-socket-io';

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: undefined,
    role: undefined
};

@Injectable()
export class AuthService {

    private subject = new BehaviorSubject<User>(undefined);
    user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));
    isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
    isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

    constructor(private http: HttpClient, private socket: Socket) {
        http.get<User>('/api/user').pipe(
            tap(console.log))
            .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
    }

    login(email: string, password: string) {
        return this.http.post<User>('/api/login', { email, password }).pipe(
            shareReplay(),
            tap(user => {
                this.socket.emit('join-user', user.id.toString());
                this.subject.next(user);
            }));
    }

    logout(): Observable<any> {
        return this.http.post('/api/logout', null).pipe(
            shareReplay(),
            tap(user => this.subject.next(ANONYMOUS_USER)));
    }
}








