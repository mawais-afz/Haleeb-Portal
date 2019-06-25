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
@NgModule({
  declarations: [HomeComponent, DetailsPageComponent, MainPageComponent, SectionOneViewComponent, SectionTwoViewComponent, SectionThreeViewComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    MatRadioModule,
    AccordionModule.forRoot()
  ]
})
export class EvaluationModule { }
