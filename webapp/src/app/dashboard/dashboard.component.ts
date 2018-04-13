import { Component, OnInit } from '@angular/core';
import { Chart,Highcharts } from 'angular-highcharts';
import {ProjectService} from '../service/project/project.service'

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ProjectService]
})
export class DashboardComponent implements OnInit {
  searchObject:any = {
    limit: 100,
    skip:  0,
    filter: []
  }
  categories:any=[];
  series:any=[];
  chart: any
  ngOnInit() {
    
  }
  constructor(private projectService:ProjectService){
    this.projectService.getAll(this.searchObject).subscribe((data) => {
      debugger
      for(let item of data.result.record){
        this.categories.push(item.name)
        this.series.push(item.percentComplete);
        
      }
      console.log(this.categories)
      console.log(this.series)
      this.chart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Dashboard Chart'
        },
        credits: {
          enabled: true
        },
        xAxis: {
          categories: this.categories
        },
    
        series: [{
          name: 'User',
          //data:[0, 4, 4]
          data:   this.series
        }],
       
      });
    })
  }
 
 

}

