import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {
    constructor(private http: HttpClient) { }
    fetchPosts(page: number, callBackFunction: (result) => void) {
        this.http.get('http://localhost:3000/posts/page/' + page).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchPost(id: number, callBackFunction: (result) => void) {
        this.http.get('http://localhost:3000/posts/' + id).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchCount(callBackFunction: (result) => void) {
        this.http.get('http://localhost:3000/posts/').subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchUserPosts(userId: number, callBackFunction: (result) => void) {
        this.http.get('http://localhost:3000/posts/writerid/' + userId).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    addPost(postData: object, callBackFunction: (result) => void) {
        this.http.post('http://localhost:3000/posts/', postData).subscribe(result => {
            callBackFunction(result);
        });
    }

    editPost(postData: object, callBackFunction: (result) => void) {
        this.http.post('http://localhost:3000/posts/edit', postData).subscribe(result => {
            callBackFunction(result);
        });
    }
}
