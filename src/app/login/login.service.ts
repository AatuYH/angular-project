import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }
    authenticateUser(username: string, password: string, callBackFunction: (result) => void) {
        this.http.get('http://localhost:3000/users/' + username).subscribe(jsonObject => {
            if (jsonObject.length > 0) {
                if (password === jsonObject[0].userpass) {
                    callBackFunction({id: jsonObject[0].id, correctPassword: true});
                } else {
                    callBackFunction({id: '', correctPassword: false});
                }
            } else {
                callBackFunction({id: '', correctPassword: false});
            }
        });
    }
    getUserData(username: string, callBackFunction: (result) => void) {
        this.http.get('http://localhost:3000/users/' + username).subscribe(jsonObject => {
            callBackFunction(jsonObject);
        });
    }
    createNewUser(userData: object, callBackFunction: (result) => void) {
        this.http.post('http://localhost:3000/users/', userData).subscribe(result => {
            callBackFunction(result);
        });
    }
    getUsers(callBackFunction: (result) => void) {
        this.http.get('http://localhost:3000/users/').subscribe(result => {
            callBackFunction(result);
        });
    }
}
