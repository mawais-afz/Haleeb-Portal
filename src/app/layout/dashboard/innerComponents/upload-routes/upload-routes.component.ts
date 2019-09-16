import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-routes',
  templateUrl: './upload-routes.component.html',
  styleUrls: ['./upload-routes.component.scss']
})
export class UploadRoutesComponent implements OnInit {

  title="upload Routes";
  regions:any=[];
  selectedRegion:any={}
  minDate=new Date();
  maxDate=new Date(2025,1,1);
  startDate;
  constructor() { }

  ngOnInit() {
  }
  regionChange(){

  }
}
