import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-posts',
  template: `<form [formGroup]="addPostForm" (ngSubmit)="onSubmit()">
               <div class="form-group">
                 <label for="title">Title</label>
                 <input type="text" formControlName="title" class="form-control"
                  [ngClass]="{ 'is-invalid': submitted && f.title.errors }">
                 <div *ngIf="submitted && f.title.errors" class="invalid-feedback">
                   <div *ngIf="f.title.errors.required">Title is required</div>
                 </div>
               </div>
               <div class="form-group">
                 <label for="content">Content</label>
                 <textarea formControlName="content" class="form-control"
                  [ngClass]="{ 'is-invalid': submitted && f.content.errors }"></textarea>
                 <div *ngIf="submitted && f.title.errors" class="invalid-feedback">
                   <div *ngIf="f.content.errors.required">Content is required</div>
                 </div>
               </div>
               <div class="form-group">
                 <button>Post</button>
               </div>
             </form>
             <p *ngIf="submitted && successfulPost">Posted successfully!</p>
             <p *ngIf="submitted && !successfulPost">Something went wrong</p>`,
  styles: [`form { width: 60%; margin-left: 50px; margin-right: auto; }
            textarea { height: 400px; }`]
})
export class AddPostComponent implements OnInit {
    addPostForm: FormGroup;
    submitted = false;
    successfulPost: boolean;
    userId: string;
    postObject = {};
    constructor(private router: Router,
                private postsService: PostsService,
                private formBuilder: FormBuilder) { }
    ngOnInit() {
        if ((localStorage.getItem('id') === null) && (localStorage.getItem('username') === null) &&
            (sessionStorage.getItem('id') === null) && (sessionStorage.getItem('username') === null)) {
                this.router.navigateByUrl('/');
        }
        if (!(localStorage.getItem('id') === null)) {
            this.userId = localStorage.getItem('id');
        } else if (!(sessionStorage.getItem('id') === null)) {
            this.userId = sessionStorage.getItem('id');
        }
        this.addPostForm = this.formBuilder.group({
          title: ['', Validators.required],
          content: ['', Validators.required]
        });
    }

    get f() { return this.addPostForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.addPostForm.invalid) {
          return;
      }
      this.postObject = {title: this.addPostForm.value.title, content: this.addPostForm.value.content, writerId: this.userId};
      this.postsService.addPost(this.postObject, (result) => {
          if (result.affectedRows > 0) {
              this.successfulPost = true;
          } else {
              this.successfulPost = false;
          }
      });
  }
}
