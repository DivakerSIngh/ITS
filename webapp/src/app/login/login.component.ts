import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AccountService} from '../service/account/account.service'
import{User} from '../model/user'
import{LoaderService} from '../service/comman/loader.service'
//import {MdSnackBar, MdDialog, MdDialogRef} from '@angular/material'

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AccountService,User]
})
export class LoginComponent implements OnInit {
userdetail:any
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private loader:LoaderService,
   // public snackBar: MdSnackBar,
    private accouuntService:AccountService   
  ) { 

  }

  ngOnInit() {
   this.userdetail={};
   this.userdetail.organization={}
  }
login(){
debugger
 this.router.navigate(['/home']);

}
signUp(userdetail){
  debugger
  this.loader.display(true);
  //this.openSnackBar("suceesss sdsdfsdfsdfdf");
this.accouuntService.signUp(userdetail).subscribe((data) => {
   debugger
   this.loader.display(false);
},error=>{
  console.warn("error", error);
});
}
// openSnackBar(message: string) {
//   this.snackBar.open(message, '', {
//     duration: 100000
//   });
// }
}
