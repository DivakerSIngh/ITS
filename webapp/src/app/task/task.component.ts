import { Component, ElementRef, ViewChild, Input,OnInit,Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
  
})
@Injectable()
export class TaskComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any, 
  private elementRef:ElementRef) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var s = this.document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/index.js";
    this.elementRef.nativeElement.appendChild(s);
   
  }
}
