import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not.found.component';
import { PostsComponent } from './posts/posts.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AddPostComponent } from './posts/add.post.component';
import { EditPostComponent } from './posts/edit.post.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes =  [
  {path: '', redirectTo: 'posts/1', pathMatch: 'full'},
  {path: 'posts', redirectTo: 'posts/1', pathMatch: 'full'},
  {path: 'posts/add', component: AddPostComponent},
  {path: 'posts/:page', component: PostsComponent},
  {path: 'view/:id', component: ViewComponent},
  {path: 'view/:id/edit', component: EditPostComponent},
  {path: 'view', redirectTo: 'posts/1', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users/:username', component: UserComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
