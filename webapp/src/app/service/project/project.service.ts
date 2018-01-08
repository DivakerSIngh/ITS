import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BaseService } from '../Base.Service';
import { ApiConfig } from '../ApiConfig';
import { Observable } from 'rxjs/Rx';
import {ApplicationHeader} from '../Base.Service'

@Injectable()
export class ProjectService {

  constructor(private http:Http,private header:ApplicationHeader) { 
   
  }

  save(request) {
    return this.http.post(ApiConfig.saveProject,request,{headers:this.header.getHeader()})
           .map((response: Response) => {
         debugger
         return response.json();
           })
           .catch((error: any) => Observable.throw(error.json() || 'Server error'));
}
getAll(request) {
 
 return this.http.get(ApiConfig.projectList,{headers:this.header.getHeader()})
           .map((response: Response) => {
         
         return response.json();
           })
           .catch((error: any) => Observable.throw(error.json() || 'Server error'));
}
delete(request) {
 
  return this.http.post(ApiConfig.deleteProject,request,{headers:this.header.getHeader()})
            .map((response: Response) => {
          
          return response.json();
            })
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
 }

}
