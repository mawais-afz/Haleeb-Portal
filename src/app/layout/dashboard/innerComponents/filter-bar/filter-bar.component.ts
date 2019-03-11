import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
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
  cities: any = [];
  channels: any = [];
  allData: any;
  allDataClone: any;
  selectedZone: any = {};
  selectedRegion: any = {};
  selectedChannel: any = {};
  startDate = new Date();
  endDate = new Date();

  constructor(private httpService: DashboardService) {
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
  }

  ngOnInit() { }

  zoneChange() {
    this.loadingData = true;
    this.regions = [];
    this.cities = [];
    this.channels = [];
    // this.allData = this.allDataClone;
    console.log('selected zone', this.selectedZone);
    // this.filterData = [];

    this.httpService.getRegion(this.selectedZone.id).subscribe(
      data => {
        this.regions = data;
        console.log(this.regions);
        // this.filterAllData();
      },
      error => { }
    );
    // this.filterData = this.allData.filter(d => d.zone === this.selectedZone.title);
    // this.allData = this.filterData;
    // this.loadingData = false;
  }

  regionChange() {
    // this.loadingData = true;

    // this.allData = this.allDataClone;
    // this.filterData = [];
    console.log('regions id', this.selectedRegion);
    this.httpService.getCities(this.selectedRegion.id).subscribe(
      data => {
        // this.cities = data[0];
        console.log('channel list', data);
        this.channels = data[0];
        // this.filterAllData();
      },
      error => { }
    );
    // this.filterData = this.allData.filter(d => d.zone === this.selectedZone.title && d.region === this.selectedRegion.title);
    // this.allData = this.filterData;
    // this.loadingData = false;
  }
  getReport() {
    // console.log('selected filters', this.selectedZone, this.selectedRegion, this.startDate, this.endDate, this.selectedChannel);

    const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
      channelId: this.selectedChannel.id || -1,
      areaId: '',
      distId: '',
      actionType: ''

    };

    console.log(obj);

    this.httpService.downloadOOSDetail(obj).subscribe(data => { }, error => { });


  }
}
