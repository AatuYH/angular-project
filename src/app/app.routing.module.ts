import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not.found.component';
import { PostsComponent } from './posts/posts.component';
import { ViewComponent } from './view/view.component';

const appRoutes: Routes =  [
  {path: '', redirectTo: 'posts/1', pathMatch: 'full'},
  {path: 'posts', redirectTo: 'posts/1', pathMatch: 'full'},
  {path: 'posts/:page', component: PostsComponent},
  {path: 'view/:id', component: ViewComponent},
  {path: 'view', redirectTo: 'posts/1', pathMatch: 'full'},
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
