import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {  } from '../authentication.service';

@Injectable()
export class AuthGuardService {
  token:any;
  constructor(public router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean>|boolean{
    
    if(this.authenticateValidator() == true){
        return true;
    }else{
        this.router.navigate(['/login']);
        return false;
    }

  }
  authenticateValidator() {
    
    this.token = localStorage.getItem('auth-token') || null;
    if (this.token) {
        return true;
    } else {
        return false;
    }
  }

}
