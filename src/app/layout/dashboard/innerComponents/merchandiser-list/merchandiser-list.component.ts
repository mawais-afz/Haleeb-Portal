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
maxDate = new Date();
startDate=new Date();
endDate=new Date();
loadingReportMessage=false;
  merchandiserList: any=[];
  constructor(private httpService:DashboardService) { }

  ngOnInit() {
    this.getMerchandiserList();
  }

  getMerchandiserList(){
    let obj={
      evaluatorId:localStorage.getItem('user_id'),
    };

    this.httpService.getMerchandiserListForEvaluation(obj).subscribe((data:any)=>{
      // console.log('merchandiser list for evaluation',data);
      this.merchandiserList=data;
    })

  }

  modifyDate(date){
    return moment(date).subtract('day',1).format('YYYY-MM-DD');
  }

}
