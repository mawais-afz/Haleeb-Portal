import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    zones: any = [];

    constructor(private httpService: DashboardService, private toastr: ToastrService) {

    }

    ngOnInit() {
        console.log('dashboard init');
        this.getZone();
    }

    getZone() {
        this.zones = [];

        this.httpService.getZone().subscribe(data => {
            const res: any = data;
            this.zones = res;
            localStorage.setItem('zoneList', JSON.stringify(this.zones));

        }, error => {

           (error.status === 0) ? this.toastr.error('Please check Internet Connection', 'Error') : this.toastr.error(error.description, 'Error');

        });
    }

}
