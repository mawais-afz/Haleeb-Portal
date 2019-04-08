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
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './innerComponents/details/details.component';
import { DailyVisitReportComponent } from './innerComponents/daily-visit-report/daily-visit-report.component';
import { ShopDetailComponent } from './innerComponents/shop-detail/shop-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MslDashboardComponent } from './innerComponents/msl-dashboard/msl-dashboard.component';
import { ProductivityDashboardComponent } from './innerComponents/productivity-dashboard/productivity-dashboard.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { TposmDeploymentReportComponent } from './innerComponents/tposm-deployment-report/tposm-deployment-report.component';
@NgModule({
    imports: [
        FormsModule,
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
        ModalModule.forRoot(),
        Ng2Charts

    ],
    declarations: [DashboardComponent, HomeComponent, ShopListComponent, SummaryComponent, ProductivityComponent, FilterBarComponent, DetailsComponent, DailyVisitReportComponent, ShopDetailComponent, MslDashboardComponent, ProductivityDashboardComponent, TposmDeploymentReportComponent]
})
export class DashboardModule {}
