import { Component, ElementRef, ViewChild, Input,OnInit,Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-rfi',
  templateUrl: './rfi.component.html',
  styleUrls: ['./rfi.component.css']
})
@Injectable()
export class RfiComponent implements OnInit {

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
