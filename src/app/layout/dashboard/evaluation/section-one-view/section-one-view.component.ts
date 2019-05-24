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
  @Output('showModal') showModal:any=new EventEmitter<any>();
  @Output('productList') productForEmit:any=new EventEmitter<any>();
  @Input('isEditable') isEditable :any;
  selectedShop: any={}; 
  ip=environment.ip;
  products: any=[];
  surveyId: number=0;
  updatingMSL=false;
  changeColor: boolean=false;
  colorUpdateList:any=[];
  availability: any;
  

  constructor() {
    // var arr=router.url.split('/');
    // this.surveyId=+arr[arr.length-1]
    // console.log(this.surveyId)
   }

//    getAvailabilityCount(products)
//    {
//      let pro=products.map(p=>p.available_sku)
//      let sum=pro.reduce((a,v)=>a+v);
//      return sum;
//    }
//    getMSLCount(products)
//    {
//      let pro=products.map(p=>{
// let obj={};
//       if(p.available_sku==1 && p.MSL=='Yes'){
//         obj={
//           available_sku:p.available_sku,
//           MSL:p.MSL
//         }

//       }
       
//     })
//      let sum=pro.reduce((a,v)=>a+v);
//      return sum;
//    }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.data=changes.data.currentValue;
    // this.products=changes.productList.currentValue;
    // if(this.products.length>0)
    // this.availability=this.getAvailabilityCount(this.products);
    // console.log('is editable',this.isEditable)
    // this.getMSLCount(this.products)
    
  }
  showChildModal(shop): void {
    this.selectedShop=shop;
    this.showModal.emit(this.selectedShop)
    // this.childModal.show();
  }
 
  hideChildModal(): void {
    // this.childModal.hide();
  }

  

  
}
