import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsPageComponent } from './details-page/details-page.component';

@NgModule({
  declarations: [HomeComponent, DetailsPageComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule { }
