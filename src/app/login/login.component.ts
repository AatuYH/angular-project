import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  template: `<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
               <div class="form-group">
                 <label for="username">Username</label>
                 <input type="text" formControlName="username" class="form-control"
                  [ngClass]="{ 'is-invalid': submitted && f.username.errors }">
                 <div *ngIf="submitted && f.username.errors" class="invalid-feedback">
                   <div *ngIf="f.username.errors.required">Username is required</div>
                 </div>
               </div>
               <div class="form-group">
                 <label for="password">Password</label>
                 <input type="password" formControlName="password" class="form-control"
                  [ngClass]="{ 'is-invalid': submitted && f.password.errors }">
                 <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                   <div *ngIf="f.password.errors.required">Password is required</div>
                 </div>
               </div>
               <div class="form-group">
                 <label for="checkbox">Stay logged in</label>
                 <input type="checkbox" formControlName="checkbox" class="form-control">
               </div>
               <div class="form-group">
                 <button>Login</button>
               </div>
               <div *ngIf="invalidLogin && submitted">Invalid username or password</div>
             </form>
             <p>Don't have an account? <a routerLink="/register">Sign up here</a></p>`,
  styles: []
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    invalidLogin = false;

    constructor(private loginService: LoginService,
                private router: Router,
                private formBuilder: FormBuilder) { }

    ngOnInit() {
        if (!(localStorage.getItem('id') === null) && !(localStorage.getItem('username') === null) ||
            !(sessionStorage.getItem('id') === null) && !(sessionStorage.getItem('username') === null)) {
                this.router.navigateByUrl('/');
            }
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            checkbox: ['']
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loginService.authenticateUser(this.loginForm.value.username, this.loginForm.value.password, (result) => {
            if (result.correctPassword === true) {
                if (this.loginForm.value.checkbox === true) {
                    localStorage.setItem('id', result.id);
                    localStorage.setItem('username', this.loginForm.value.username);
                    window.location.reload();
                } else {
                    sessionStorage.setItem('id', result.id);
                    sessionStorage.setItem('username', this.loginForm.value.username);
                    window.location.reload();
                }
            } else {
                this.invalidLogin = true;
            }
        });
    }
}
