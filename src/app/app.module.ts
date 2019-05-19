import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from './posts.service';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not.found.component';
import { PostsComponent } from './posts/posts.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AddPostComponent } from './posts/add.post.component';
import { EditPostComponent } from './posts/edit.post.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NotFoundComponent,
    ViewComponent,
    LoginComponent,
    UserComponent,
    AddPostComponent,
    EditPostComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    PostsService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
