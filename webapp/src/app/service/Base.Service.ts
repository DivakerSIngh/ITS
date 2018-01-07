export const BaseService= {
    _baseServiceUrl:  "http://localhost:3040/api/"
    
}
import {Headers} from '@angular/http'
import { Injectable } from '@angular/core';
import {AppService} from '../service/app/app.service'
@Injectable()
export class ApplicationHeader {
    
  constructor(private appservice:AppService){

  }
    
getHeader() {
    
    let headers = new Headers();
    // this.appservice.get.subscribe((token) => {
    //     debugger
    //     if(typeof token!="object")
    //     {
    //         headers.append('auth-token', localStorage.getItem('auth-token'))
    //     }
    // })
    headers.append('auth-token', localStorage.getItem('auth-token'))
    headers.append('Content-Type', "application/json")
    return headers;
  }
}