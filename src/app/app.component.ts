import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<nav>
               <button routerLink="/posts/1">Posts</button>
               <button routerLink="/users/{{username}}" *ngIf="isLoggedIn">{{username}}</button>
               <button routerLink="/posts/add" *ngIf="isLoggedIn">Add post</button>
               <button routerLink="/login" *ngIf="!isLoggedIn">Login</button>
               <button (click)="logout()" *ngIf="isLoggedIn">Logout</button>
             </nav>
             <div>
               <router-outlet></router-outlet>
             </div>`,
  styles: [`nav { margin-bottom: 10px; }`]
})
export class AppComponent implements OnInit {
    isLoggedIn = false;
    username: string;
    userId: string;
    ngOnInit() {
        if (!(localStorage.getItem('id') === null) && !(localStorage.getItem('username') === null)) {
            this.isLoggedIn = true;
            this.username = localStorage.getItem('username');
            this.userId = localStorage.getItem('id');
        } else if (!(sessionStorage.getItem('id') === null) && !(sessionStorage.getItem('username') === null)) {
            this.isLoggedIn = true;
            this.username = sessionStorage.getItem('username');
            this.userId = sessionStorage.getItem('id');
        }
    }

    logout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
}
