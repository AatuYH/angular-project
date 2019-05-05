import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'view',
  template: `<div *ngIf="!notFound">
               <h2>{{post[0].title}}</h2>
               <p>{{post[0].content}}</p>
             </div>
             <div *ngIf="notFound">
               <p>The post you are trying to view does not exist</p>
             </div>`,
  styles: []
})
export class ViewComponent implements OnInit {
    post = {};
    dataReady = false;
    notFound = true;
    constructor(public postsService: PostsService,
                private router: Router) { }

    ngOnInit() {
        let url = this.router.url;
        let id = url.replace(/\D/g,'') * 1;
        this.postsService.fetchPost(id, (result) => {
            this.post = result;
            if (this.post.length !== 0) {
                this.notFound = false;
            }
            this.dataReady = true;
        });
    }
}
