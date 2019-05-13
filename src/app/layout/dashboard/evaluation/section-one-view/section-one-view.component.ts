import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'section-one-view',
  templateUrl: './section-one-view.component.html',
  styleUrls: ['./section-one-view.component.scss']
})
export class SectionOneViewComponent implements OnInit,OnChanges {

  @Input('data') data;
  @Input('productList') productList;
  @ViewChild('childModal') childModal: ModalDirective;
  @Output('showModal') showModal:any=new EventEmitter<any>()
  selectedShop: any={};
 
  ip=environment.ip;
  products: any=[];
  surveyId: number=0;
  updatingMSL=false;
  

  constructor(private router:Router,private httpService:EvaluationService,private toastr:ToastrService) {
    var arr=router.url.split('/');
    this.surveyId=+arr[arr.length-1]
    console.log(this.surveyId)
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.data=changes.data.currentValue;
    this.products=changes.productList.currentValue;
    
  }
  showChildModal(shop): void {
    this.selectedShop=shop;
    this.showModal.emit(this.selectedShop)
    // this.childModal.show();
  }
 
  hideChildModal(): void {
    // this.childModal.hide();
  }

  updateString(value){
    return value?'Yes':'No';
  }

  toggleValue(value){
    this.updatingMSL=true
    console.log(value)

    let obj={
      msdId:value.id,
      unitAvailable:!!value.available_sku? 0:1,
      surveyId:this.surveyId
    }
    // return value?'YES':'NO';

this.httpService.updateMSLStatus(obj).subscribe((data:any)=>{
  if(data.success){
    this.products=data.productList;
    // this.toastr.success('Status updated successfully.','Update MSL');
    this.updatingMSL=false;


  }
  else{
    this.toastr.error(data.message,'Update MSL')
  }
})

  }
}
