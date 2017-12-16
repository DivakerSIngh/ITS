import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../model/index'

@Injectable()
export class AuthenticationService
{
    constructor(private http: Http,
        //private userDom: User
    )
    { 
       
    }

    login(username: string, password: string) {
        debugger
        return this.http.post('http://localhost:8081/api/login/Authenticate',{ Email: username, Password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
               // this.userDom._userList = response.json();
                if (user) {
                    localStorage.setItem('isAuth', 'Hello');
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
                }
            });
    }

    logout() {
         //remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}