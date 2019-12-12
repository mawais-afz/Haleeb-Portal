import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'section-seven-view',
  templateUrl: './section-seven-view.component.html',
  styleUrls: ['./section-seven-view.component.scss']
})
export class SectionSevenViewComponent implements OnInit {

  @Input('data') data;
  // @ViewChild('childModal') childModal: ModalDirective;
  // @Output('showModal') showModal:any=new EventEmitter<any>()
  // @Input('isEditable') isEditable :any;
  selectedShop: any={};
  selectedImage:any={};
  ip=environment.ip;
  hover="hover";
  zoomOptions={
    Mode:"hover"
  }
  zoomedImage="https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238569.jpg"
  

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes.data.currentValue){
      this.data=changes.data.currentValue;
      this.selectedImage=this.data.imageList[0];
    }
    
    
  }

  setSelectedImage(img){
    this.selectedImage=img;

  }

}
