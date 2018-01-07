import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route,Router } from '@angular/router';
import {AccountService} from '../service/account/account.service'
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userName:String
email:String
  constructor(private accouuntService:AccountService,private router:Router) {

   
   }

  ngOnInit() {
    debugger
    this.userName= localStorage.getItem('userName');
     this.email= localStorage.getItem('email');
  }
  logout(){
    debugger
    console.log("logout called");
    this.accouuntService.logout().subscribe((data)=>{
        this.accouuntService.clearLocalStorage()
         this.router.navigate(['/login'])
    },err => {
         if(err.error && err.statusCode == 401 ){
           this.router.navigate(['/login'])
         }else {
           this.router.navigate(['/login'])
         }
     })
  }

}
