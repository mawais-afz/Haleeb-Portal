import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
ip=environment.ip;
  tableData:any=[];      
  headingsList:any =[]; 
  loading=true;
  constructor(private router:Router,private toastr:ToastrService,private httpService:EvaluationService,private activeRoute:ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(p=>{
      console.log('active params',p);
      if(p.surveyorId && p.startDate && p.endDate){
 
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
      if(this.tableData.length==0){
        this.loading=false;
        this.toastr.info('No record found.');
        setTimeout(() => {
        this.router.navigate(['/dashboard/merchandiser_List'])
          
        }, 3000);
      }
    this.headingsList=Object.keys(data);

    },error=>{})
    

  }

  gotoNewPage(id){  
    window.open(`${environment.hash}dashboard/evaluation/list/details/${id}`,'_blank')
    }
 
}
