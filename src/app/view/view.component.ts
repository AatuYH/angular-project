import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'view',
  template: `<div class="container">
               <div *ngIf="!notFound">
                 <h2>{{post[0].title}}</h2>
                 <p id="content">{{post[0].content}}</p>
                 <p>Writer: <a routerLink="/users/{{writerName}}">{{writerName}}</a></p>
                 <button routerLink="/view/{{id}}/edit" *ngIf="isWriter">Edit</button>
               </div>
               <div *ngIf="notFound">
                 <p>The post you are trying to view does not exist</p>
               </div>
             </div>`,
  styles: [`.container { width: 90%, margin-left: auto; margin-right: auto; }
            h2 { text-align: center; }
            #content { white-space: pre-wrap; }`]
})
export class ViewComponent implements OnInit {
    post;
    dataReady = false;
    notFound = true;
    id: number;
    userId: string;
    writerId: string;
    writerName: string;
    isWriter = false;
    constructor(public postsService: PostsService,
                public loginService: LoginService,
                public activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params.id;
        });
        if (!(localStorage.getItem('id') === null) && !(localStorage.getItem('username') === null)) {
            this.userId = localStorage.getItem('id');
        } else if (!(sessionStorage.getItem('id') === null) && !(sessionStorage.getItem('username') === null)) {
            this.userId = sessionStorage.getItem('id');
        }
        this.postsService.fetchPost(this.id, (result) => {
            this.post = result;
            this.writerId = this.post[0].writerId;
            this.loginService.getUserData(this.writerId, (writerResult) => {
                this.writerName = writerResult[0].username;
            });
            if (this.post.length > 0) {
                this.notFound = false;
            }
            this.dataReady = true;
            if (this.writerId == this.userId) {
                this.isWriter = true;
            }
        });
    }
}
