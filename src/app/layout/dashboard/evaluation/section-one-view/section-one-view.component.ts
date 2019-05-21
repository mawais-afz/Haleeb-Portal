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
  

  constructor(private router:Router,private httpService:EvaluationService,private toastr:ToastrService) {
    var arr=router.url.split('/');
    this.surveyId=+arr[arr.length-1]
    // console.log(this.surveyId)
   }

   getAvailabilityCount(products)
   {
     let pro=products.map(p=>p.available_sku)
     let sum=pro.reduce((a,v)=>a+v);
     return sum;
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.data=changes.data.currentValue;
    this.products=changes.productList.currentValue;
    if(this.products.length>0)
    this.availability=this.getAvailabilityCount(this.products);
    console.log('is editable',this.isEditable)
    
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
    if(this.isEditable){
      this.changeColor=true;
      this.updatingMSL=true
     
      this.colorUpdateList.push(value.id)
      let obj={
        msdId:value.id,
        unitAvailable:!!value.available_sku? 0:1,
        surveyId:this.surveyId
      }
      // return value?'YES':'NO';
  
  this.httpService.updateMSLStatus(obj).subscribe((data:any)=>{
    if(data.success){
      this.products=data.productList;
  
      data.productList.forEach(e => {
  
      for (const key of this.colorUpdateList) {
        if(key==e.id){
          var i=this.products.findIndex(p=>p.id==key);
          let obj={
            id:e.id,
            available_sku:e.available_sku,
            MSL:e.MSL,
            product_title:e.product_title,
            category_title:e.category_title,
            color:'red'
          };
    
          this.products.splice(i,1,obj);
          // console.log(this.products[i])
        }
     
        
      
      }
  
      this.availability=this.getAvailabilityCount(this.products)
  
             
      });
  
      this.productForEmit.emit(this.products);
      // this.toastr.success('Status updated successfully.','Update MSL');
      this.updatingMSL=false;
  
  
    }
    else{
      this.toastr.error(data.message,'Update MSL')
    }
  })
  
    }
   
  }
}
