import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
@Component({
  selector: 'app-merchandiser-list',
  templateUrl: './merchandiser-list.component.html',
  styleUrls: ['./merchandiser-list.component.scss']
})
export class MerchandiserListComponent implements OnInit {
title="merchandiser List"
minDate = new Date(2000, 0, 1);
maxDate:any = new Date();
startDate:any=new Date();
endDate=new Date();
loadingReportMessage=false;
  merchandiserList: any=[];
  loading: boolean=true;
  p: number = 1;
  constructor(private httpService:DashboardService) { 

  this.maxDate.setDate(this.maxDate.getDate()-1);
  this.startDate.setDate(this.startDate.getDate()-1)

// this.startDate=moment(this.startDate).subtract('day',1).format('YYYY/MM/DD')

  }

  ngOnInit() {
    this.getMerchandiserList();
  }

  getMerchandiserList(){
    let obj={
      evaluatorId:localStorage.getItem('user_id'),
    };

    this.httpService.getMerchandiserListForEvaluation(obj).subscribe((data:any)=>{
      // console.log('merchandiser list for evaluation',data);
      if(data){
        this.merchandiserList=data;
        this.loading=false;

      }
    })

  }

  modifyDate(date){
    return moment(date).format('YYYY-MM-DD');
  }

}
