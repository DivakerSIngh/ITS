import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AccountService} from '../service/account/account.service'
import{User} from '../model/user'
import{LoaderService} from '../service/comman/loader.service';
import{SnackBar} from '../service/comman/snackBar'
// import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AccountService,User,SnackBar]
})
export class LoginComponent implements OnInit {
userdetail:any
logo:any;
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private loader:LoaderService,
   public snackBar: SnackBar,
    private accouuntService:AccountService   
  ) { 

  }

  ngOnInit() {
   this.userdetail={};
   this.userdetail.organization={}
  }
login(){

 this.router.navigate(['/home']);

}
signUp(userdetail){
  
  this.loader.display(true);
 
this.accouuntService.signUp(userdetail).subscribe((data) => {
   
   this.loader.display(false);
   this.snackBar.openSnackBar("You Have Successfull Registered!","Close");
   
},error=>{
  console.warn("error", error);
});
}

onFileChange(fileInput){

  let fileList: FileList = fileInput.target.files;

  if (fileList.length > 0) {
    let file: File = fileList[0];
    console.log(fileList, file);
    let fileSize: number = fileList[0].size;

    if (fileSize <= 10485760) {
      //this.formData.set('avatar', file);
    }
  }
  this.logo = fileInput.target.files[0];
  let reader = new FileReader();
  reader.onload = (e: any) => {
      this.logo = e.target.result;
  }
  reader.readAsDataURL(fileInput.target.files[0]);
}
}
