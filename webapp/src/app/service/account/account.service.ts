import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BaseService } from '../Base.Service';
import { ApiConfig } from '../ApiConfig';
import { Observable } from 'rxjs/Rx';
import {ApplicationHeader} from '../Base.Service'
@Injectable()
export class NameService {

  constructor() { }
}

@Injectable()
export class AccountService {

  constructor(private http:Http,private header:ApplicationHeader) { 
   
  }

  login() {
    return 'Hey!';
}
signUp(request) {
  
  return this.http.post(ApiConfig.signUp,request,{headers:this.header.getHeaderOfProfilePic()})
            .map((response: Response) => {
          
          return response.json();
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
}

}
