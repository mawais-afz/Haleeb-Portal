import { Component, OnInit, Input, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'section-two-view',
  templateUrl: './section-two-view.component.html',
  styleUrls: ['./section-two-view.component.scss']
})
export class SectionTwoViewComponent implements OnInit {

  @Input('data') data;
  @ViewChild('childModal') childModal: ModalDirective;
  @Output('showModal') showModal:any=new EventEmitter<any>()

  selectedShop: any={};
  selectedImage:any={};
  ip=environment.ip;
  

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.data=changes.data.currentValue;
    this.selectedImage=this.data.imageList[0];
    
  }

  setSelectedImage(img){
    this.selectedImage=img;

  }
  showChildModal(shop): void {
    this.selectedShop=shop;
    this.showModal.emit(this.selectedImage)

    // this.childModal.show();
  }
 
  hideChildModal(): void {
    // this.childModal.hide();
  }
}
