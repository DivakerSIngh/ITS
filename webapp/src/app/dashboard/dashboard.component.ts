import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
userName:String
email:String
  getDynamicClass(classNumber){

var cssClass:string="bg-aqua";
switch  (classNumber){
case 1:
cssClass= "bg-aqua aqua-shadow";
break;
case 2:
cssClass= "bg-green green-shadow";
break;
case 3:
cssClass= "bg-yellow yellow-shadow";
break;
case 4:
cssClass= "bg-red red-shadow";
break;
}
return cssClass;
  }
  customList=[];
  constructor() {
   var count:number=1;
    for(let i=1;i<16;i++){
      if(count>4){
        count=1;
      }

      let myarr={
        "Id":i.toString(),
        "DisplayText":"Coaching Institutes",
        "RedirectUrl":"dashboard"   ,
        "Count": count 
      }
      this.customList.push(myarr);
      count++;
    }
   

   }
  ngOnInit() {
    debugger
      this.userName= localStorage.getItem('userName');
     this.email= localStorage.getItem('email');
  }

}

export interface customList{
  Id:number;
  DisplayText:string;
  RedirectUrl:string;
  Count:string;
}
