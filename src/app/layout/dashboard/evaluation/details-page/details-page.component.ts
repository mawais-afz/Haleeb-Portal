import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  tableData:any=[];      
  headingsList:any =[]; 
  constructor(private httpService:EvaluationService,private activeRoute:ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(p=>{
      console.log('active params',p);
      if(p.surveyorId && p.startDate && p.endDate){
        // let obj=p;
        this.getTableData(p);
      }
    
    })

   }

  ngOnInit() {
    // this.getTableData();
  }

  getTableData(obj){
    // let date='2019-04-29';//new Date();
    // let obj={
    //   startDate:moment(date).format('YYYY-MM-DD'),
    //   endDate:moment(date).format('YYYY-MM-DD')
    // }

    this.httpService.getData(obj).subscribe(data=>{
      // console.log(data);
      this.tableData=data;
    this.headingsList=Object.keys(data);

    },error=>{})
    

  }

  gotoNewPage(id){  
    window.open(`/#/dashboard/evaluation/list/details/${id}`,'_blank')
    }
 
}
