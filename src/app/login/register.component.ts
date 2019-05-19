import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  template: `<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
               <div class="form-group">
                 <label for="username">Username</label>
                 <input type="text" formControlName="username" class="form-control"
                  [ngClass]="{ 'is-invalid': submitted && f.username.errors }">
                 <div *ngIf="submitted && f.username.errors" class="invalid-feedback">
                   <div *ngIf="f.username.errors.required">Username is required</div>
                   <div *ngIf="nameTaken">Username is already taken</div>
                 </div>
               </div>
               <div class="form-group">
                 <label for="password">Password</label>
                 <input type="password" formControlName="password" class="form-control"
                  [ngClass]="{ 'is-invalid': submitted && f.password.errors }">
                 <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                   <div *ngIf="f.password.errors.required">Password is required</div>
                   <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
                   <div *ngIf="f.password.errors.maxlength">Password cannot be over 25 characters</div>
                   <div *ngIf="f.password.errors.pattern">Password must contain at least one capital letter, lowercase letter and a number</div>
                 </div>
               </div>
               <div class="form-group">
                 <button>Register</button>
               </div>
               <div *ngIf="registerSuccessful">Registering successful</div>
             </form>`,
  styles: []
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    nameTaken = false;
    registerSuccessful = false;
    usedNames = [];
    constructor(private loginService: LoginService,
                private router: Router,
                private formBuilder: FormBuilder) { }

    ngOnInit() {
        if (!(localStorage.getItem('id') === null) && !(localStorage.getItem('username') === null) ||
            !(sessionStorage.getItem('id') === null) && !(sessionStorage.getItem('username') === null)) {
                this.router.navigateByUrl('/');
            }
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25),
                            Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$')]]
        });
        this.loginService.getUsers((result) => {
            this.usedNames = result;
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.usedNames.forEach(user => {
            if (user.username === this.registerForm.value.username) {
                this.nameTaken = true;
            }
        });
        if (this.registerForm.invalid || this.nameTaken) {
            return;
        }
        this.loginService.createNewUser(this.registerForm.value, (result) => {
            if (result.affectedRows > 0) {
                this.registerSuccessful = true;
            }
        });
    }
}
