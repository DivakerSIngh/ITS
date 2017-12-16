import { Component, ElementRef, ViewChild, Input,OnInit,Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

//import Chart from 'chart.js';
declare let Chart:any;
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
@Injectable()
export class IssueComponent implements OnInit {
  @Input()
  src: string;

  @Input()
  type: string;

  @ViewChild('script') script: ElementRef;

  
 
  constructor(@Inject(DOCUMENT) private document: any, 
  private elementRef:ElementRef) {};

  ngAfterViewInit() {
    
    // var sa = this.document.createElement("link");
    // sa.rel = "stylesheet";
    // sa.href = "https://kendo.cdn.telerik.com/2017.3.1026/styles/kendo.common-material.min.css";
    // this.elementRef.nativeElement.appendChild(sa);

    // var sb = this.document.createElement("link");
    // sb.rel = "stylesheet";
    // sb.href = "https://kendo.cdn.telerik.com/2017.3.1026/styles/kendo.material.min.css";
    // this.elementRef.nativeElement.appendChild(sb);

    // var sc = this.document.createElement("script");
    // sc.type = "text/javascript";
    // sc.src = "https://kendo.cdn.telerik.com/2017.3.1026/js/jquery.min.js";
    // this.elementRef.nativeElement.appendChild(sc);

    // var sd = this.document.createElement("script");
    // sd.type = "text/javascript";
    // sd.src = "https://kendo.cdn.telerik.com/2017.3.1026/js/kendo.all.min.js";
    // this.elementRef.nativeElement.appendChild(sd);
   

    // var schart= this.document.createElement("script");
    // schart.type = "text/javascript";
    // schart.src = "assets/js/chart.js";
    // this.elementRef.nativeElement.appendChild(schart);
  }
  

    ngOnInit() {
       
    }

}
