import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private httpService: DashboardService, private toastr: ToastrService, private router: Router) {
    // console.log(router.url);
  }

  ngOnInit() {
    var t = moment(new Date).format('YYYY-MM-DD');
    var st = localStorage.getItem('today');
    if (t > st) this.router.navigate(['/login']);
    this.getZone();
  }

  getZone() {
    this.httpService.getZone().subscribe(
      data => {
        const res: any = data;
        if (res.zoneList) {
          localStorage.setItem('zoneList', JSON.stringify(res.zoneList));
          localStorage.setItem('assetList', JSON.stringify(res.assetList));
          localStorage.setItem('channelList', JSON.stringify(res.channelList));
        }
      },
      error => {
        error.status === 0 ? this.toastr.error('Please check Internet Connection', 'Error') : this.toastr.error(error.description, 'Error');
      }
    );
  }
}
