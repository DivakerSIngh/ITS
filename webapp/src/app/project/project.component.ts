import { Component, ElementRef, ViewChild, Input,OnInit,Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';




@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
@Injectable()
export class ProjectComponent implements OnInit  {
  progress:any; 
  logo:any; 
  filesToUpload: Array<File>;

  getDynamicClass(classNumber){
         return "bg-aqua";
  }
  customList=[];
  constructor(@Inject(DOCUMENT) private document: any, 
  private elementRef:ElementRef) {

   

   var count:number=1;
    for(let i=1;i<16;i++){
      if(count>4){
        count=1;
      }

      let myarr={
        "Id":i.toString(),
        "DisplayText":"Node",
        "RedirectUrl":"dashboard"   ,
        "Count": count 
      }
      this.customList.push(myarr);
      count++;
    }
   

   }
   ngAfterViewInit() {
    var s = this.document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/index.js";
    this.elementRef.nativeElement.appendChild(s);
   
  }
  ngOnInit() {
    debugger
    //new makeModelAnimated();
  }
  onFileChange(fileInput: any){
    debugger
    this.logo = fileInput.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.logo = e.target.result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
}
  
 }

export interface customList{
  Id:number;
  DisplayText:string;
  RedirectUrl:string;
  Count:string;
}
