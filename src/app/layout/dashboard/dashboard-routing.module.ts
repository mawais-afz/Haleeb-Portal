import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/shared/guard';
import { DashboardGuard } from './dashboard.guard';
import { HomeComponent } from './innerComponents/home/home.component';
import { ShopListComponent } from './innerComponents/shop-list/shop-list.component';
import { SummaryComponent } from './innerComponents/summary/summary.component';
import { ProductivityComponent } from './innerComponents/productivity/productivity.component';
import { DetailsComponent } from './innerComponents/details/details.component';
import { DailyVisitReportComponent } from './innerComponents/daily-visit-report/daily-visit-report.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [DashboardGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'daily_visit_report', component: DailyVisitReportComponent },
            { path: 'oos_details_report', component: DetailsComponent },
            { path: 'shop_list_report', component: ShopListComponent },
            { path: 'summary_report', component: SummaryComponent },
            { path: 'productivity_report', component: ProductivityComponent }



        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
