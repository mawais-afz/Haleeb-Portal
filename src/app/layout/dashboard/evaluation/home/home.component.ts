import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data:any=[];
  ip=environment.ip;
  
 
  constructor(private activatedRoutes:ActivatedRoute,private httpService:EvaluationService) { 
    let id:any=0;
    this.activatedRoutes.params.subscribe(params=>{

      id=params.id;

      let obj={
        surveyId:id
      }

      this.getData(obj)
    })
  }

  ngOnInit() {
  }

  getData(obj){

    this.httpService.getShopDetails(obj).subscribe(data=>{
      this.data=data;
      console.log(this.data)
    },error=>{})

  }

}
