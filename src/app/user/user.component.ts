import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'user',
  template: `<div [ngSwitch]="userExists" *ngIf="dataFetched">
               <div *ngSwitchCase="true">
                 <p>Name: {{username}}</p>
                 <p>Created: {{this.created}}</p>
                 <mat-table [dataSource]="userPosts">
                   <ng-container matColumnDef="titleColumn">
                     <mat-header-cell *matHeaderCellDef>Posts by this user</mat-header-cell>
                     <mat-cell *matCellDef="let post">{{post.title}}</mat-cell>
                   </ng-container>
                   <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                   <mat-row *matRowDef="let row; columns: displayedColumns;" (click)="onRowClicked(row)"></mat-row>
                 </mat-table>
               </div>
               <p *ngSwitchCase="false">Unfortúnately, there are no users by that name.</p>
             </div>`,
  styles: [`mat-table { width: 90%; margin-left: auto; margin-right: auto; }`]
})
export class UserComponent implements OnInit {
    userId: number;
    username: string;
    userExists = false;
    dataFetched = false;
    userPosts = [];
    created: string;
    displayedColumns = ['titleColumn'];
    constructor(public loginService: LoginService,
                public postsService: PostsService,
                public activatedRoute: ActivatedRoute,
                public router: Router) { }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.username = params.username;
        });
        this.loginService.getUserData(this.username, (result) => {
            if (result.length > 0) {
                this.userExists = true;
                this.userId = result[0].id;
                this.created = result[0].created;
                this.postsService.fetchUserPosts(this.userId, (result2) => {
                    this.userPosts = result2;
                });
            }
            this.dataFetched = true;
        });
    }

    onRowClicked(obj) {
      this.router.navigate(['/view/' + obj.id]);
  }
}
