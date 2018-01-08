import { Component, ElementRef, ViewChild, Input,OnInit,Inject,  Output, EventEmitter,Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {LoaderService} from '../service/comman/loader.service'


import { Router, ActivatedRoute } from '@angular/router';
import {ProjectService} from '../service/project/project.service'
import{Project} from '../model/project'
import{SnackBar} from '../service/comman/snackBar'


declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers:[ProjectService,Project,SnackBar]
})
@Injectable()

export class ProjectComponent implements OnInit  {
  saveSuccess:Boolean=true

  progress:any; 
  logo:any; 
  modal:String="";
  saveProjectObject:Project;
  buttonText:String="Save And Add";
  projectList:Project[];
  filesToUpload: Array<File>;

  getDynamicClass(classNumber){
         return "bg-aqua";
  }
  customList=[];
  constructor(private snackBar:SnackBar,private projectService:ProjectService,
    private loader:LoaderService,@Inject(DOCUMENT) private document: any, 
  private elementRef:ElementRef) {
this.getAll();
   this.saveProjectObject=new Project();

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
   setColor(color){
     
   
   this.saveProjectObject.color="#"+color;
   }
   ngAfterViewInit() {
    var s = this.document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/index.js";
    this.elementRef.nativeElement.appendChild(s);
   
  }
  ngOnInit() {
    
   
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
  saveProject(){
    debugger
    //////////logic for set id and value of dropdwoon while its not coming from data base//
    this.saveProjectObject.groupName=this.saveProjectObject.groupId.split('+')[1];
    this.saveProjectObject.groupId=this.saveProjectObject.groupId.split('+')[0];  

    
    this.saveProjectObject.reportingManagerName=this.saveProjectObject.reportingManagerId.split('+')[1];
    this.saveProjectObject.reportingManagerId=this.saveProjectObject.reportingManagerId.split('+')[0];

    this.saveProjectObject.status=this.saveProjectObject.statusId.split('+')[1];
    this.saveProjectObject.statusId=this.saveProjectObject.statusId.split('+')[0];
   

    this.saveProjectObject.organizationId=  localStorage.getItem('organizationId');
    this.saveProjectObject.createdBy= localStorage.getItem('userName');

    //////////////////
    this.projectService.save(this.saveProjectObject).subscribe((data) => {
      if(data.statusCode==200)
      {
        this.modal="modal";
        this.snackBar.openSnackBar(data.message);
       this.projectList= data.result;
       $('#costumModal3').modal('hide');
      }else{
        this.snackBar.openSnackBar(data.message);
      }
       this.saveProjectObject= new Project();
       this.saveSuccess=false;
       this.snackBar.openSnackBar("Project Saved Successfull!","Close");
    },error=>{
      console.warn("error", error);
    });
  }
  clear(){
    this.saveProjectObject=new Project;
  }
  edit(project){
debugger
this.saveProjectObject._id=project._id;
this.saveProjectObject.name=project.name;
this.saveProjectObject.groupId=project.groupId+'+'+project.groupName;
this.saveProjectObject.statusId=project.statusId+'+'+project.status;
this.saveProjectObject.color=project.color;
this.saveProjectObject.percentComplete=project.percentComplete;
this.saveProjectObject.reportingManagerId=project.reportingManagerId+'+'+project.reportingManagerName;

  }
getAll(){
  
  this.loader.display(false);
  this.projectService.getAll({}).subscribe((data) => {
    if(data.statusCode==200)
    {
      if(data.result.length>0) 
      this.snackBar.openSnackBar(data.message);
      else
      this.snackBar.openSnackBar('No data found');
     this.projectList= data.result;
    }else{
      this.snackBar.openSnackBar(data.message);
    }
    this.loader.display(false);
    this.saveProjectObject= new Project();
 },error=>{
   console.warn("error", error);
 });
}
delete(project){
  
  this.loader.display(false);
  this.projectService.delete({isDeleted: 1, _id: project._id}).subscribe((data) => {
    
    if(data.statusCode==200)
    {
      this.snackBar.openSnackBar("Project Delete Successfull!");
     this.projectList= data.result;
    }else{
      this.snackBar.openSnackBar(data.message);
    }
    this.loader.display(false);
    this.saveProjectObject= new Project();
 },error=>{
   console.warn("error", error);
 });
}
  
 }

export interface customList{
  Id:number;
  DisplayText:string;
  RedirectUrl:string;
  Count:string;
}
