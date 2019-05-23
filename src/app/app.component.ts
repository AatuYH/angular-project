import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<nav class="navbar navbar-expand-lg navbar-light bg-light">
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul class="navbar-nav mr-auto">
                   <li class="nav-item">
                     <a class="nav-link" routerLink="/posts/1">Posts</a>
                   </li>
                   <li class="nav-item" *ngIf="!isLoggedIn">
                     <a class="nav-link" routerLink="/login">Login</a>
                   </li>
                   <li class="nav-item dropdown" *ngIf="isLoggedIn">
                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       {{username}}
                     </a>
                     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                       <a class="dropdown-item" routerLink="/users/{{username}}">Profile</a>
                       <a class="dropdown-item" routerLink="/posts/add">Add post</a>
                       <a class="dropdown-item" href="" (click)="logout()">Logout</a>
                     </div>
                   </li>
                 </ul>
               </div>
             </nav>
             <div>
               <router-outlet></router-outlet>
             </div>`,
  styles: []
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
