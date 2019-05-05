import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './app.component';

@Injectable()
export class PostsService {
    constructor(private http: HttpClient) { }
    fetchPosts(page: number, callBackFunction: (result: Post[]) => void) {
        this.http.get('http://localhost:3000/posts/page/' + page).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchPost(id: number, callBackFunction: (result: Post) => void) {
        this.http.get('http://localhost:3000/posts/' + id).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchCount(callBackFunction: (result: Post[]) => void) {
        this.http.get('http://localhost:3000/posts/').subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }
}
