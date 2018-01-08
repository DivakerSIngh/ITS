import { Component, OnInit } from '@angular/core';
//import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // chart: any = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Dashboard Chart'
  //   },
  //   credits: {
  //     enabled: true
  //   },
  //   xAxis: {
  //     categories: [1,2,3,4,5,6,7,8,9]
  //   },

  //   series: [{
  //     name: 'User',
  //     //data:[0, 4, 4]
  //     data:   [10,25,3,48,5,6,79,8,93]
  //   }]
  // });
  ngOnInit() {
   
  }

}

