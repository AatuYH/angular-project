import { Component,  OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

export interface Post {
  id: number;
  title: string;
  content: string;
  writerId: number;
}

@Component({
  selector: 'posts',
  template: `<mat-table [dataSource]="posts">
               <ng-container matColumnDef="titleColumn">
                 <mat-header-cell *matHeaderCellDef> Title </mat-header-cell>
                 <mat-cell *matCellDef="let post">{{post.title}}</mat-cell>
               </ng-container>
               <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
               <mat-row *matRowDef="let row; columns: displayedColumns;" (click)="onRowClicked(row)"></mat-row>
             </mat-table>
             <button [hidden]="page <= 1" (click)="moveTo('previous')">Back</button>
             <button [hidden]="page * 12 >= postCount" (click)="moveTo('next')">More posts</button>`,
  styles: [`mat-row { width: 33%;
                      float: left;
                      border: 1px solid black;
                      text-align: center;
                      margin: 0.05%; }
            mat-header-cell { display: none }
            mat-table { height: 100%; width: 100%; }`]
})
export class PostsComponent implements OnInit {
    posts = [];
    postCount: number;
    page = parseInt(this.router.url.split('/').pop());
    displayedColumns = ['titleColumn'];
    constructor(public postsService: PostsService,
                public router: Router) { }

    ngOnInit() {
        this.postsService.fetchCount((result) => {
            this.postCount = result[0].number;
        });
        this.postsService.fetchPosts(this.page, (result) => {
            this.posts = result;
        });
    }

    onRowClicked(obj: Post) {
        this.router.navigate(['/view/' + obj.id]);
    }

    moveTo(direction: string) {
        if (direction === 'next') {
            this.page++;
            this.router.navigate(['/posts/' + this.page]);
            this.postsService.fetchPosts(this.page, (result) => {
                this.posts = result;
            });
        } else if (direction === 'previous') {
            this.page--;
            this.router.navigate(['/posts/' + this.page]);
            this.postsService.fetchPosts(this.page, (result) => {
                this.posts = result;
            });
        }
    }
}
