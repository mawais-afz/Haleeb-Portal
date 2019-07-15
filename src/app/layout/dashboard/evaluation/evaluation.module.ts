import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModalModule } from 'ngx-bootstrap';
import { SectionOneViewComponent } from './section-one-view/section-one-view.component';
import { SectionTwoViewComponent } from './section-two-view/section-two-view.component'
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { SectionThreeViewComponent } from './section-three-view/section-three-view.component';
import { AccordionModule } from 'ngx-bootstrap';
import { SectionFourViewComponent } from './section-four-view/section-four-view.component';
import { MatCardModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SectionFiveComponent } from './section-five/section-five.component';
@NgModule({
  declarations: [HomeComponent, DetailsPageComponent, MainPageComponent, SectionOneViewComponent, SectionTwoViewComponent, SectionThreeViewComponent, SectionFourViewComponent, SectionFiveComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    MatRadioModule,
    AccordionModule.forRoot(),
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    NgxImageZoomModule.forRoot()
  ]
})
export class EvaluationModule { }
