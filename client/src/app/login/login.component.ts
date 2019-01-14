import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    messagePerErrorCode = {
        loginfailed: 'Invalid credentials'
    };

    errors = [];

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.form = this.fb.group({
            email: ['c1@gmail.com', Validators.required],
            password: ['123456', Validators.required]
        });
    }

    ngOnInit() {

    }

    login() {
        const val = this.form.value;
        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    () => {
                        console.log('User is logged in');
                        this.router.navigateByUrl('/');
                    }
                );
        }
    }
}









