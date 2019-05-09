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
import { pathToFileURL } from 'url';
import { ShopDetailComponent } from './innerComponents/shop-detail/shop-detail.component';
import { MslDashboardComponent } from './innerComponents/msl-dashboard/msl-dashboard.component';
import { ProductivityDashboardComponent } from './innerComponents/productivity-dashboard/productivity-dashboard.component';
import { TposmDeploymentReportComponent } from './innerComponents/tposm-deployment-report/tposm-deployment-report.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';
import { RawDataComponent } from './raw-data/raw-data.component';
import { DataAvailabilityComponent } from './data-availability/data-availability.component';
import { MerchandiserListComponent } from './innerComponents/merchandiser-list/merchandiser-list.component';

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
            { path: 'productivity_report', component: ProductivityComponent },
            { path: 'msl_dashboard', component: MslDashboardComponent },
            { path: 'productivity_dashboard', component: ProductivityDashboardComponent },            
            { path: 'tposm_deployment_report', component: TposmDeploymentReportComponent },
            { path: 'update_password', component: UpdatePasswordComponent },
            { path: 'raw_data', component: RawDataComponent },
            { path: 'data_availability_report', component: DataAvailabilityComponent },

            { path: 'merchandiser_List', component: MerchandiserListComponent },



        ]
    },
    // { path: 'shop_detail/:id', component: ShopDetailComponent },
    { path: 'shop_detail/:id', component: ShopDetailComponent },

    { path: 'evaluation', loadChildren: './evaluation/evaluation.module#EvaluationModule' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
