import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedRemarksList:any=[];
  selectedCriteria: any={};
  evaluationArray: any=[];
  productList: any=[];
  msl: any;
  availabilityCount: number;
  cloneArray: any=[];
  isFromShop: boolean=true;
  rotationDegree: number=0;
  isEditable: any=false;
  selectedIndex: number=-1;
  criteriaDesireScore:any=0;
  totalAchieveScore: number=0;
 
  constructor(private router:Router,private toastr:ToastrService,private activatedRoutes:ActivatedRoute,private httpService:EvaluationService,private evaluationService:EvaluationService) { 
    this.surveyId

    this.activatedRoutes.queryParams.subscribe(q=>{

      if(q.location)
      this.isFromShop=false;
    })
    this.activatedRoutes.params.subscribe(params=>{


      this.surveyId=params.id;

      let obj={
        surveyId:this.surveyId,
        userTypeId:localStorage.getItem('user_type')
    // userId:localStorage.getItem('user_id')
      }

      this.getData(obj)
    });

  }

  ngOnInit() {
   
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  rotateImage(){
    if(this.rotationDegree==360){
      this.rotationDegree=90;
    }
    else{
    this.rotationDegree+=90;
    }
    

  }
  getData(obj){

    this.httpService.getShopDetails(obj).subscribe(data=>{
      if(data){
        this.data=data;

    document.title=this.data.section[0].sectionTitle;
    if(this.data.criteria){
      this.evaluationArray=this.data.criteria;
      this.getTotalAchieveScore()
      this.cloneArray=this.evaluationArray.slice();
    }
   

        // console.log(this.data)
        this.remarksList=this.data.remarks;
        this.productList=this.data.productList;

        localStorage.setItem('productList',JSON.stringify(this.productList))
        this.msl=this.data.msl;
        this.isEditable=this.data.isEditable || this.isEditable;
        if(this.productList.length>0)
        this.availabilityCount=this.getAvailabilityCount(this.productList);
        if(this.data.criteria)
        this.calculateScore();

      }
   
    },error=>{})

  }

  calculateMSLAgain(products){
   this.msl=this.data.msl
   localStorage.setItem('productList',JSON.stringify(products));
   this.productList=localStorage.getItem('productList');

    this.availabilityCount=this.getAvailabilityCount(products);
    
  }

  getAvailabilityCount(products)
  { if(!products){
    products=localStorage.getItem('productList')
  }
    let pro=products.map(p=>p.available_sku)
    let sum=pro.reduce((a,v)=>a+v);
    return (sum/pro.length)*(this.msl);
  }
  
  getCriteriaWithRemarks(remarks,criteria){
    let obj={
      remarkId:remarks,
      id:criteria.id,
      title:criteria.title,
      score:criteria.score,
      criteriaMapId:criteria.criteriaMapId,
      achievedScore:(this.criteriaDesireScore>0)?this.criteriaDesireScore:0,
      isEditable:criteria.isEditable
    }
    this.cloneArray.forEach(element => {

      var i=this.cloneArray.findIndex(e=>e.id==criteria.id);
      this.cloneArray.splice(i,1,obj);
      
    });

    // this.evaluationArray.push(obj);
    console.log('evaluation array clone',this.cloneArray);
    this.updateAchieveScore(criteria.id);
    this.hideRemarksModal();
    this.selectedRemarks='';
    this.selectedRemarksList=[];
    this.criteriaDesireScore=0;


  }

  checkboxChange(event,id){
    console.log('checkbox event',!event.checked,id)

    if(!event.checked)
    this.selectedRemarksList.push(id)
    else{
      for( var i = 0; i < this.selectedRemarksList.length; i++){ 
        if ( this.selectedRemarksList[i] == id) {
          this.selectedRemarksList.splice(i, 1); 
        }
     }
    }
    // this.selectedRemarksList.pop(id)

    console.log('remarks list',this.selectedRemarksList)

  }

  updateAchieveScore(id){

   for (let index = 0; index < this.cloneArray.length; index++) {
     const element = this.cloneArray[index];

     if(element.id==id){
       this.cloneArray[index].achievedScore=this.criteriaDesireScore;
     }
     
   }
   this.totalAchieveScore=this.getTotalAchieveScore();

  }


  getTotalAchieveScore(){
    let score=0;
    this.cloneArray.forEach(element => {
      score=score+element.achievedScore
      
    });

    return score;
  }
  counter(event,criteria,index){


    this.selectedIndex=index;
    
    // console.dir(event.checked)
    if(event.checked){
      // this.score=this.score-Math.abs(criteria.score);
      this.totalAchieveScore=(this.criteriaDesireScore>0)?this.totalAchieveScore+Math.abs(this.criteriaDesireScore):this.totalAchieveScore+Math.abs(criteria.score);
      this.indexList.push(index);
      // console.log('checked',this.indexList)
      this.selectedCriteria=criteria;
      // 
      this.showRemarksModal();
      

    }
    else{
      this.score=this.score+Math.abs(criteria.score);
      let i=this.indexList.indexOf(index)
      this.indexList.splice(i,1);

      if(this.evaluationArray.length>0){
        let obj={
          id:criteria.id,
          title:criteria.title,
          score:criteria.score,
          // remarkId:-1
        }
        let e=this.evaluationArray.findIndex(i=>i.id==criteria.id)
        this.cloneArray.splice(e,1,obj);
      console.log('unchecked evaluation array',this.cloneArray)
        
      }
      
    }
  }

  cancelCriteriaSelection(){

    var inputs:any = document.querySelectorAll('.checkbox');
    for (var j = 0; j < inputs.length; j++) {
      if(this.selectedCriteria.id==inputs[j].id)
      inputs[j].checked = false;
    }
let criteria=this.selectedCriteria
    this.score=this.score+Math.abs(criteria.score);
    let i=this.indexList.indexOf(this.selectedIndex)
    this.indexList.splice(i,1);

    if(this.evaluationArray.length>0){
      let obj={
        id:criteria.id,
        title:criteria.title,
        score:criteria.score,
        // remarkId:-1
      }
      let e=this.evaluationArray.findIndex(i=>i.id==criteria.id)
      this.cloneArray.splice(e,1,obj);
    console.log('unchecked evaluation array,using cancel button',this.cloneArray)
      
    }
    this.hideRemarkModalForCancelOption();


  }

  calculateScore(){
    this.score
    this.data.criteria.map(c=>{
      if(c.score>0)
      this.score+=c.score
    });
    // this.score=this.score-(this.msl);

    console.log('total score is',this.score)
  }
  evaluateShop(){
    let user_id=localStorage.getItem('user_id')
    this.loading=true;
    let req=true;
    // if(this.selectedRemarks==0 || this.selectedRemarks==false || this.selectedRemarks==''){
    //   this.toastr.info(`please select remarks for ALL selected criteria`);
    //   this.loading=false;
    //   req=false;
    // }
    // this.cloneArray.forEach(element => {
      
    //     if (element.remarkId=='' || element.remarkId==false) {
    //       this.toastr.info(`please select remarks for "${element.title}"`);
    //       req=false;
    //       this.loading=false;
    //     }
        
    //   });
      // this.evaluationArray.forEach(element => {
      //   if(this.selectedRemarks==0 || this.selectedRemarks==false || this.selectedRemarks==''){
      //     if (element.remarkId=='' || element.remarkId==false) {
      //       this.toastr.info(`please select remarks for "${element.title}"`);
      //       req=false;
      //       this.loading=false;
      //     }
          
      //   }});
      
 
     
 if(req){
   let pl=JSON.parse(localStorage.getItem('productList'))
   this.getAvailabilityCount(pl)
  let obj={
    criteria:this.cloneArray,      
    surveyId:this.surveyId,
    evaluatorId:user_id,
    msl:Math.round(this.availabilityCount  )
  }
this.evaluationService.evaluateShop(obj).subscribe((data:any)=>{
// console.log('evaluated shop data',data);
this.loading=false;

if(data.success){
this.toastr.success('shop evaluated successfully ');
this .evaluationArray=[];
this.cloneArray=[]
this.indexList=[];
setTimeout(() => {
  
window.close();
  
}, 2000);
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

    
  }
 
  showChildModal(shop): void {
    this.selectedShop=shop;
    this.rotationDegree=0;
    this.childModal.show();
  }
 
  hideChildModal(): void {
  
    this.childModal.hide();
   
  }

  showRemarksModal(){
    this.remarksModal.show()
  }

  hideRemarkModalForCancelOption(){
    this.remarksModal.hide()

  }
  hideRemarksModal(){
    if(this.selectedRemarksList.length>0)
    this.remarksModal.hide()
    else{
      this.toastr.info(`please select remarks for "${this.selectedCriteria.title}"`)
    }
  }

  //  zoomIn(event) {
  //   var element = document.getElementById("overlay");
  //   element.style.display = "inline-block";
  //   var img = document.getElementById("imgZoom");
  //   var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
  //   var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
  //   element.style.backgroundPosition=(-posX*2)+"px "+(-posY*4)+"px";
  
  // }
  
  //  zoomOut() {
  //   var element = document.getElementById("overlay");
  //   element.style.display = "none";
  // }
}
