import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModalModule } from 'ngx-bootstrap'
@NgModule({
  declarations: [HomeComponent, DetailsPageComponent, MainPageComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ModalModule.forRoot()
  ]
})
export class EvaluationModule { }
