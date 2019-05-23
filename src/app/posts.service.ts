import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {
    constructor(private http: HttpClient) { }
    fetchPosts(page: number, callBackFunction: (result) => void) {
        this.http.get('https://ang-backend.herokuapp.com/posts/page/' + page).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchPost(id: number, callBackFunction: (result) => void) {
        this.http.get('https://ang-backend.herokuapp.com/posts/' + id).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchCount(callBackFunction: (result) => void) {
        this.http.get('https://ang-backend.herokuapp.com/posts/').subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    fetchUserPosts(userId: number, callBackFunction: (result) => void) {
        this.http.get('https://ang-backend.herokuapp.com/posts/writerid/' + userId).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }

    addPost(postData: object, callBackFunction: (result) => void) {
        this.http.post('https://ang-backend.herokuapp.com/posts/', postData).subscribe(result => {
            callBackFunction(result);
        });
    }

    editPost(postData: object, callBackFunction: (result) => void) {
        this.http.post('https://ang-backend.herokuapp.com/posts/edit', postData).subscribe(result => {
            callBackFunction(result);
        });
    }
}
