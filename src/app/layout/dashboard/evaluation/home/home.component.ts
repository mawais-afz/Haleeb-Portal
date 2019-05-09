import { Component, OnInit, ViewChild } from '@angular/core';
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data:any=[];
  ip=environment.ip;
loading=false;
  selectedShop:any={}
  
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('remarksModal') remarksModal: ModalDirective;

  score: any=0;
 
  indexList:any=[];
  surveyId: any=0;
  remarksList: any=[];
  selectedRemarks:any=false;
  selectedCriteria: any={};
  evalutaionArray: any=[];
 
  constructor(private toastr:ToastrService,private activatedRoutes:ActivatedRoute,private httpService:EvaluationService,private evaluationService:EvaluationService) { 
    this.surveyId
    this.activatedRoutes.params.subscribe(params=>{

      this.surveyId=params.id;

      let obj={
        surveyId:this.surveyId
      }

      this.getData(obj)
    })
  }

  ngOnInit() {
  }

  getData(obj){

    this.httpService.getShopDetails(obj).subscribe(data=>{
      if(data){
        this.data=data;
        // console.log(this.data)
        this.calculateScore();
        this.remarksList=this.data.remarks
      }
   
    },error=>{})

  }
  
  getCriteriaWithRemarks(remarks,criteria){
    let obj={
      remarksId:remarks,
      criteria:criteria
    }

    this.evalutaionArray.push(obj);
    console.log('evaluation array',this.evalutaionArray);
    this.selectedRemarks=''

  }
  counter(event,criteria,index){
    
    // console.dir(event.checked)
    if(event.checked){
      this.score=this.score-criteria.score;
      this.indexList.push(index);
      // console.log('checked',this.indexList)
      this.selectedCriteria=criteria
      this.showRemarksModal();

    }
    else{
      this.score=this.score+criteria.score;
      let i=this.indexList.findIndex(i=>i==index)
      this.indexList.splice(i,1);

      if(this.evalutaionArray.length>0){
        let e=this.evalutaionArray.findIndex(i=>i.criteria.id==criteria.id)
        this.evalutaionArray.splice(e,1);
      console.log('unchecked evaluation array',this.evalutaionArray)
        
      }
      
    }
  }

  calculateScore(){
    this.score
    this.data.criteria.map(c=>{this.score+=c.score});

    console.log('total score is',this.score)
  }
  evaluateShop(){
    let user_id=localStorage.getItem('user_id')
    this.loading=true;
    let obj={
      criteriaId:this.evalutaionArray,
      surveyId:this.surveyId,
      evaluatorId:user_id
    }
this.evaluationService.evaluateShop(obj).subscribe((data:any)=>{
  // console.log('evaluated shop data',data);
  this.loading=false;

  if(data.success){
  this.toastr.success('shop evaluated successfully ')
  setTimeout(() => {
  // window.close();
    
  }, 3000);
}
  else{
    this.toastr.info(data.errorMessage,'Info')
  }
},error=>{
  // console.log('evaluated shop error',error)
  // window.close()
  this.loading=false;
  this.toastr.error(error.message,'Error');

})

    
  }
 
  showChildModal(shop): void {
    this.selectedShop=shop;
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.childModal.hide();
  }

  showRemarksModal(){
    this.remarksModal.show()
  }
  hideRemarksModal(){
    this.remarksModal.hide()
  }

}
