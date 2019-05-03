import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModalModule } from 'ngx-bootstrap';
import { SectionOneViewComponent } from './section-one-view/section-one-view.component';
import { SectionTwoViewComponent } from './section-two-view/section-two-view.component'
@NgModule({
  declarations: [HomeComponent, DetailsPageComponent, MainPageComponent, SectionOneViewComponent, SectionTwoViewComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ModalModule.forRoot()
  ]
})
export class EvaluationModule { }
