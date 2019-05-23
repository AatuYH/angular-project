import { Component,  OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'edit-posts',
  template: `<form [formGroup]="editPostForm" (ngSubmit)="onSubmit()">
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
                 <button class="btn btn-primary">Post</button>
               </div>
             </form>
             <p *ngIf="submitted && successfulPost">Edited successfully!</p>
             <p *ngIf="submitted && !successfulPost">Something went wrong</p>`,
  styles: [`form { width: 60%; margin-left: 50px; margin-right: auto; }
            textarea { height: 400px; }`]
})
export class EditPostComponent implements OnInit {
    editPostForm: FormGroup;
    id: number;
    submitted = false;
    successfulPost: boolean;
    userId: string;
    fetchedTitle: string;
    fetchedContent: string;
    postObject = {};
    constructor(private router: Router,
                private postsService: PostsService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) { }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params.id;
            console.log(this.id);
        });
        if ((localStorage.getItem('id') === null) && (localStorage.getItem('username') === null) &&
            (sessionStorage.getItem('id') === null) && (sessionStorage.getItem('username') === null)) {
                this.router.navigateByUrl('/');
        }
        if (!(localStorage.getItem('id') === null)) {
            this.userId = localStorage.getItem('id');
        } else if (!(sessionStorage.getItem('id') === null)) {
            this.userId = sessionStorage.getItem('id');
        }
        this.postsService.fetchPost(this.id, (result) => {
            this.fetchedTitle = result[0].title;
            this.fetchedContent = result[0].content;
            this.editPostForm = this.formBuilder.group({
                title: [this.fetchedTitle, Validators.required],
                content: [this.fetchedContent, Validators.required]
            });
        });
    }

    get f() { return this.editPostForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.editPostForm.invalid) {
          return;
      }
      this.postObject = {title: this.editPostForm.value.title, content: this.editPostForm.value.content, id: this.id};
      this.postsService.editPost(this.postObject, (result) => {
          if (result.affectedRows > 0) {
              this.successfulPost = true;
          } else {
              this.successfulPost = false;
          }
      });
  }
}
