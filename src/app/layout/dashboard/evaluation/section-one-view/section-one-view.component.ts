import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'section-one-view',
  templateUrl: './section-one-view.component.html',
  styleUrls: ['./section-one-view.component.scss']
})
export class SectionOneViewComponent implements OnInit,OnChanges {

  @Input('data') data;
  @ViewChild('childModal') childModal: ModalDirective;
  @Output('showModal') showModal:any=new EventEmitter<any>()
  selectedShop: any={};
 
  ip=environment.ip;
  

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.data=changes.data.currentValue;
    
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
