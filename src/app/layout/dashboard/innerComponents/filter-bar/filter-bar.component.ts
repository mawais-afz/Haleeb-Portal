import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  zones: any = [];
  constructor(private httpService: DashboardService) {
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
  }

  ngOnInit() {

  }


}
