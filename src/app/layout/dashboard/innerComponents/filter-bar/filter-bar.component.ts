import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardDataService } from '../../dashboard-data.service';
@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  @Input() title;
  zones: any = [];
  loadingData: boolean;
  regions: any = [];
  channels: any = [];
  allData: any;
  allDataClone: any;
  selectedZone: any = {};
  selectedRegion: any = {};
  selectedChannel: any = {};
  startDate = new Date();
  endDate = new Date();
  areas: Object;
  lastVisit: any = [];
  selectedLastVisit = 0;
  mustHave: { key: string; value: string; }[];
  selectedMustHave=false;
  constructor(private httpService: DashboardService, public router: Router, private dataService: DashboardDataService) {
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
  }

  ngOnInit() {

    console.log('router', this.router.url);
    this.lastVisit = this.dataService.getLastVisit();
    this.mustHave = this.dataService.getYesNo();
    this.httpService.getZone();

  }

  zoneChange() {
    this.loadingData = true;
    this.regions = [];
    this.channels = [];


    this.httpService.getRegion(this.selectedZone.id).subscribe(
      data => {
        this.regions = data;
      },
      error => { }
    );

  }

  regionChange() {

    console.log('regions id', this.selectedRegion);
    this.httpService.getCities(this.selectedRegion.id).subscribe(
      data => {
        this.channels = data[0];

      },
      error => { }
    );

  }

  cityChange() {

    this.httpService.getAreas(this.selectedChannel).subscribe(data => {
      this.areas = data;
      // this.filterAllData();

    }, error => { });

  }

  chanelChange() {
    console.log("seelcted chanel", this.selectedChannel);
    this.httpService.getAreas(this.selectedChannel).subscribe(data => {
      this.areas = data;
      // this.filterAllData();

    }, error => { });



  }


  getReport() {
    const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
      channelId: this.selectedChannel.id || -1,
      areaId: '',
      distId: '',
      actionType: '1',
      pageType: '8'

    };

    this.httpService.DownloadResource(obj);



  }
}
