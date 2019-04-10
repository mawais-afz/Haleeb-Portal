import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { ChartType, ChartOptions } from 'chart.js';
import * as moment from 'moment';
// tslint:disable-next-line: import-blacklist
import { Observable,interval } from 'rxjs';

import { Router } from '@angular/router';
// import { Label } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  tabsData: any = [];
  loading = true;
  date=Date();


  constructor(private httpService: DashboardService,private router:Router) { }

  ngOnInit() {
    this.getData();
    interval(300000).subscribe(i=>{this.getData()})
  }

// pi cahrt
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'right',
  },
  // plugins: {
  //   datalabels: {
  //     formatter: (value, ctx) => {
  //       const label = ctx.chart.data.labels[ctx.dataIndex];
  //       return label;
  //     },
  //   },
  // }
};
public pieChartLabels: any[] = [['MSL'], ['OOS']];
public pieChartData: number[] = [67,100];
public pieChartLabels2: any[] = [['CBL'], ['Competition']];
public pieChartData2: number[] = [45,100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
// public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['#AFFCAF','#FCAFAF'],
  },
];
public pieChartColors2 = [
  {
    backgroundColor: [ '#AFFCAF','#FCAFAF'],
  },
];
public chartClicked( e: any ): void {
  if (e.active.length > 0) {
    const chart = e.active[0]._chart;
    const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        // console.log(clickedElementIndex, label, value)
        this.router.navigate(['/dashboard/msl_dashboard']);
      }
     }
}
// pie chart end


 

  getData() {
    this.tabsData=[];
    this.loading=true;
    let d=Date();
    let obj: any = {
      typeId:1,
      startDate: moment(d).format('YYYY-MM-DD'),
      endDate: moment(d).format('YYYY-MM-DD'),
    }
    this.httpService.getDashboardData(obj).subscribe(data => {
      console.log(data, 'home data');
      this.tabsData = data;
      this.loading = false;

      this.pieChartData=[this.tabsData.msl,100-this.tabsData.msl];
      this.pieChartData2=[this.tabsData.sos,100-this.tabsData.sos]

    }, error => {
      console.log(error, 'home error')

    })

  }
}
