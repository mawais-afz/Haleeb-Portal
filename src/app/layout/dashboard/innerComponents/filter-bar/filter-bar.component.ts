import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardDataService } from '../../dashboard-data.service';
import { ToastrService } from 'ngx-toastr';
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
  selectedMustHave = false;
  merchandiserList: any = [];
  selectedMerchandiser: any = {}
  constructor(private toastr: ToastrService,
    private httpService: DashboardService, public router: Router, private dataService: DashboardDataService) {
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
    let url = 'oosDetail'

    this.httpService.DownloadResource(obj, url);



  }

  getMerchandiserList(event) {

    if (!this.selectedZone.id || !this.selectedRegion.id) {
      // console.log(this.selectedZone.id,this.selectedRegion.id)
      this.toastr.info('Please select zone and region to proceed', 'PDF Download');


    }
    else {
      let obj = {
        zoneId: this.selectedZone.id,
        regionId: this.selectedRegion.id,
        date: moment(this.startDate).format('YYYY-MM-DD'),

      }

      this.httpService.getMerchandiserList(obj).subscribe(data => {
        console.log('merchandiser', data);
        let res: any = data
        if (!res)
          this.toastr.warning('NO record found', 'Merchandiser List')

        else if (res.length == 0)
          this.toastr.info('NO record found,Please try again', 'Merchandiser List')


        this.merchandiserList = data
      }, error => {
        (error.status === 0) ?
          this.toastr.error('Please check Internet Connection', 'Error') :
          this.toastr.error(error.description, 'Error');
      })
    }

  }

  downloadDailyReport() {

    let obj = {
      zoneId: this.selectedZone.id,
      regionId: this.selectedRegion.id,
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      reportType: '',
      surveyorId: this.selectedMerchandiser.id,
      excelDump: 'Y',
      mailData: 'Y',
      reportLink: ''

    }
    let url = 'cbl-pdf'

    this.httpService.DownloadResource(obj, url);

  }
}
