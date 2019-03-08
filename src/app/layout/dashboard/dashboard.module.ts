import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatNativeDateModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './innerComponents/home/home.component';
import { ShopListComponent } from './innerComponents/shop-list/shop-list.component';
import { SummaryComponent } from './innerComponents/summary/summary.component';
import { ProductivityComponent } from './innerComponents/productivity/productivity.component';
import { FilterBarComponent } from './innerComponents/filter-bar/filter-bar.component';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),

    ],
    declarations: [DashboardComponent, HomeComponent, ShopListComponent, SummaryComponent, ProductivityComponent, FilterBarComponent]
})
export class DashboardModule {}
