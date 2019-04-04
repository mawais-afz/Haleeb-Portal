import { Component, OnInit, AfterViewChecked, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardDataService } from '../../dashboard-data.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { NgModel } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  tableData: any = [];
  ip = environment.ip;

  distributionList: any = [];
  selectedDistribution: any = {}
  storeType: any = ['Elite',
    'Platinum',
    'Gold',
    'Silver',
    'Others']
  selectedStoreType = null;
  applyFilter(filterValue: string) {
    this.tableData = this.tableData.filter(f => f.shop_title)
    console.log(this.tableData, 'table data filter')
  }
  //#region veriables
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  @Input() title;
  zones: any = [];
  loadingData: boolean;
  regions: any = [];
  channels: any = [];

  selectedZone: any = {};
  selectedRegion: any = {};
  selectedChannel: any = [];
  startDate = new Date();
  endDate = new Date();
  areas: any = [];
  selectedArea: any = {};
  lastVisit: any = [];
  selectedLastVisit = 0;
  mustHave: any = [];
  selectedMustHave = false;
  merchandiserList: any = [];
  selectedMerchandiser: any = {};
  clickedOnce = 1;
  categoryList: any = [];
  selectedCategory: any = {};
  cities: any = [];
  selectedCity: any = {};
  productsList: any = [];
  selectedProduct: any = [];
  selectedImpactType: any = {};
  impactTypeList: any = [];
  loadingReportMessage: boolean = false;
  tabsData: any = [];
  loading = true;
  //#endregion

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService
  ) {
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
    this.categoryList = JSON.parse(localStorage.getItem('assetList'));
    this.channels = JSON.parse(localStorage.getItem('channelList'));

    console.log(this.categoryList);

    this.getZone();

  }

  clearAllSections() {
    this.selectedZone = {};
    this.selectedRegion = {};
    this.selectedArea = {};
    this.selectedCategory = {};
    this.selectedChannel = [];
    this.selectedProduct = [];
    this.selectedCity = {};
    this.selectedDistribution = {};
    this.distributionList = [];
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit() {
    console.log('router', this.router.url);
    this.lastVisit = this.dataService.getLastVisit();
    this.mustHave = this.dataService.getYesNo();
    this.httpService.getZone();
    this.impactTypeList = this.dataService.getImpactType();
    if (this.router.url == '/dashboard/productivity_report')
      this.getTabsData()
  }
  //#region filters logic

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
        this.clearLoading()

        error.status === 0 ? this.toastr.error('Please check Internet Connection', 'Error') : this.toastr.error(error.description, 'Error');
      }
    );
  }

  zoneChange() {
    this.loadingData = true;
    // this.regions = [];
    // this.channels = [];
    if (this.router.url === '/dashboard/productivity_report')
      this.getTabsData()

    this.httpService.getRegion(this.selectedZone.id).subscribe(
      data => {
        let res: any = data;
        if(res){
          this.regions = res;
        }
        else{
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }
       
        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      error => { 
        this.clearLoading()

      }
    );
  }

  regionChange() {

    this.selectedArea = {}
    this.selectedCity = {}
    this.selectedDistribution = {};
    if (this.router.url == '/dashboard/daily_visit_report')
      this.getMerchandiserList(this.startDate);

    if (this.router.url === '/dashboard/productivity_report')
      this.getTabsData()
    if ((this.router.url !== '/dashboard/daily_visit_report')) {
      this.loadingData = true;

      console.log('regions id', this.selectedRegion);
      this.httpService.getCities(this.selectedRegion.id).subscribe(
        data => {
          // this.channels = data[0];
          let res: any = data;
          if(res){
            this.areas = res.areaList;
            this.cities = res.cityList;
            this.distributionList = res.distributionList
          }
          else{
            this.clearLoading()

            this.toastr.info('Something went wrong,Please retry','Connectivity Message')
          }
         

          setTimeout(() => {
            this.loadingData = false;
          }, 500);
        },
        error => { 
          this.clearLoading()

        }
      );
    }
    if (this.router.url === '/dashboard/daily_visit_report') {
      this.getMerchandiserList(this.startDate)
    }
  }

  categoryChange() {
    // this.loadingData = true;

    // this.httpService.getProducts(this.selectedCategory.id).subscribe(
    //   data => {
    //     this.productsList = data;

    //     setTimeout(() => {
    //       this.loadingData = false;
    //     }, 500);
    //   },
    //   error => {
      // this.clearLoading()

    //  }
    // );
  }

  cityChange() {
    // this.httpService.getAreas(this.selectedChannel).subscribe(
    //   data => {
    //     this.areas = data;
    //     // this.filterAllData();
    //   },
    //   error => { 
      // this.clearLoading()

    // }
    // );
  }

  chanelChange() {
    // console.log('seelcted chanel', this.selectedChannel);
    // this.httpService.getAreas(this.selectedChannel).subscribe(
    //   data => {
    //     this.areas = data;
    //     // this.filterAllData();
    //   },
    //   error => { 
      // this.clearLoading()

    // }
    // );
  }
  //#endregion

  getOOSDetailReport() {
    if (this.endDate >= this.startDate) {
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
      let url = 'oosDetail';

      this.httpService.DownloadResource(obj, url);
    }
    else {
      this.clearLoading()

      this.toastr.info('End date must be greater than start date', 'Date Selection');
    }
  }
  clearLoading(){
    this.loading=false;
    this.loadingData=false;
    this.loadingReportMessage=false;
  }

  getMerchandiserList(event?) {
    console.log(event);
    this.clickedOnce = 1;
    if (event) {
      this.startDate = event;
    }

    this.merchandiserList = [];
    if (!this.selectedZone.id || !this.selectedRegion.id) {
      // console.log(this.selectedZone.id,this.selectedRegion.id)
      this.toastr.info('Please select zone and region to proceed', 'PDF Download');
    } else {
      let obj = {
        zoneId: this.selectedZone.id,
        regionId: this.selectedRegion.id,
        startDate: moment(this.startDate).format('YYYY-MM-DD')
      };
      this.httpService.getMerchandiserList(obj).subscribe(
        data => {
          console.log('merchandiser', data);
          let res: any = data;
          if (!res) {
            this.toastr.warning('NO record found', 'Merchandiser List');
            this.merchandiserList = [];
          } else if (res.length == 0) {
            this.toastr.info('NO record found,Please try again', 'Merchandiser List');
          } else {
            this.merchandiserList = res;
          }
        },
        error => {

         this.clearLoading()
          error.status === 0
            ? this.toastr.error('Please check Internet Connection', 'Error')
            : this.toastr.error(error.description, 'Error');
        }
      );
    }
  }

  downloadDailyReport() {
    this.loadingData = true;
    this.loadingReportMessage = true;
    // this.clickedOnce++;

    let obj = {
      zoneId: this.selectedZone.id,
      regionId: this.selectedRegion.id,
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      reportType: '',
      surveyorId: this.selectedMerchandiser.id,
      excelDump: 'Y',
      mailData: 'Y',
      reportLink: ''
    };
    let url = 'cbl-pdf';
     this.httpService.DownloadResource(obj, url);

    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
      // this.clearAllSections()  
    }, 20000);
  }

  arrayMaker(arr) {
    let all = arr.filter(a => a === 'all');
    let result: any = []
    if (all[0] === 'all') {
      arr = this.channels;
    }
    arr.forEach(e => {
      result.push(e.id);

    });
    return result;
  }

  getOOSShopListReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      this.loadingData = true

      let obj = {
        zoneId: this.selectedZone.id || "",
        regionId: this.selectedRegion.id || "",
        cityId: this.selectedCity.id || "",
        areaId: this.selectedArea.id || "",
        channelId: this.arrayMaker(this.selectedChannel),
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        // category: -1,
        lastVisit: this.selectedLastVisit || "",
        // productId: -1,
        mustHave: 'n'
      };

      let url = 'shopwise-ost-report';
      let body =this.httpService.UrlEncodeMaker(obj);
      //  `pageType=2&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&cityId=${obj.cityId}&areaId=${obj.areaId}&channelId=${obj.channelId}&category=${obj.category}&lastVisit=${obj.lastVisit}&productId=${obj.productId}&mustHave=${obj.mustHave}`;

      this.httpService.getKeyForProductivityReport(body, url).subscribe(data => {
        console.log(data, 'oos shoplist');
        let res: any = data

        if(res){
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        }
        else{
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }


      }, error => {
        this.clearLoading()

      })
    } else {
      this.clearLoading()

      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }


    // let url = 'downloadReport';
    // this.httpService.DownloadResource(obj, url);
  }

  getOOSSummary() {

    if (this.endDate >= this.startDate) {
      this.loadingData = true
      this.loadingReportMessage = true
      let obj = {
        zoneId: this.selectedZone.id,
        regionId: this.selectedRegion.id,
        cityId: this.selectedCity.id,
        areaId: this.selectedArea.id,
        channelId: this.arrayMaker(this.selectedChannel),
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        category: -1,
        productId: -1,
        mustHave: 'N',
        chillerAllocated: -1,
        type:2,
        pageType:3
      };

     let encodeURL:any= this.httpService.UrlEncodeMaker(obj);

      let url = 'oosSummaryReport'
      let body = `chillerAllocated=${obj.chillerAllocated}&type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&mustHave=${obj.mustHave}&channelId=${obj.channelId}`;
      // encodeURL      //

      this.httpService.getKeyForProductivityReport(body, url).subscribe(data => {
        let res: any = data
        if(res){
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        }
        else{
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }
        // let obj2 = {
        //   key: res.key,
        //   fileType: 'json.fileType'
        // }
        // let url = 'downloadReport'
        // this.getproductivityDownload(obj2, url)

      }, error => {
        this.clearLoading()

        console.log(error, 'summary report')

      })
    } else {
      this.clearLoading()

      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

    // let url = 'oosSummaryReport';
    // this.httpService.DownloadResource(obj, url);
  }
  getMSLReport() {

    if (this.endDate >= this.startDate) {
      this.loadingData = true
      this.loadingReportMessage = true
      let obj = {
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        cityId: this.selectedCity.id || -1,
        areaId: this.selectedArea.id || -1,
        channelId: this.arrayMaker(this.selectedChannel),
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        // category: -1,
        // productId: -1,
        // mustHave: 'N',
        // chillerAllocated: -1,
        // type:2,
        // pageType:1
      };

     let encodeURL:any= this.httpService.UrlEncodeMaker(obj);

      let url = 'mslDashboard'
      let body = encodeURL  ;
      // `chillerAllocated=${obj.chillerAllocated}&type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&mustHave=${obj.mustHave}&channelId=${obj.channelId}`;
      //     //

      this.httpService.getKeyForProductivityReport(body, url).subscribe(data => {
        let res: any = data

        if(res){
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        }
        else{
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }

        // let obj2 = {
        //   key: res.key,
        //   fileType: 'json.fileType'
        // }
        // let url = 'downloadReport'
        // this.getproductivityDownload(obj2, url)

      }, error => {
        this.clearLoading()

        console.log(error, 'summary report')

      })
    } else {
      this.clearLoading()

      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

    // let url = 'oosSummaryReport';
    // this.httpService.DownloadResource(obj, url);
  }

  getProuctivityDashboardReport() {

    if (this.endDate >= this.startDate) {
      this.loadingData = true
      this.loadingReportMessage = true
      let obj = {
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        cityId: this.selectedCity.id || -1,
        areaId: this.selectedArea.id || -1,
        channelId: this.arrayMaker(this.selectedChannel),
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        // category: -1,
        // productId: -1,
        // mustHave: 'N',
        // chillerAllocated: -1,
        // type:2,
        // pageType:1
      };

     let encodeURL:any= this.httpService.UrlEncodeMaker(obj);

      let url = 'productivityDashboard'
      let body = encodeURL  ;
      // `chillerAllocated=${obj.chillerAllocated}&type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&mustHave=${obj.mustHave}&channelId=${obj.channelId}`;
      //     //

      this.httpService.getKeyForProductivityReport(body, url).subscribe(data => {
        let res: any = data

        if(res){
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        } else {
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }

      }, error => {
        this.clearLoading()

        console.log(error, 'summary report')

      })
    } else {
      this.loading=false;
      this.loadingData=false;
      this.loadingReportMessage=false;
      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

    // let url = 'oosSummaryReport';
    // this.httpService.DownloadResource(obj, url);
  }
  MProductivityReport() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      let obj = {
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        cityId: this.selectedCity.id || -1,
        distributionId: this.selectedDistribution.id || -1,
        storeType: this.selectedStoreType || null,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        // totalShops: this.selectedImpactType,
        channelId: -1

      };
      let url = 'productivityreport'
      let body = `type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;

      this.httpService.getKeyForProductivityReport(body, url).subscribe(data => {
        let res: any = data

        if(res){
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        } else {
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }

      }, error => {
        this.clearLoading()

        console.log(error, 'productivity error')

      })
    } else {
      this.clearLoading()

      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

  }

  getproductivityDownload(obj, url) {
    const u = url
    this.httpService.DownloadResource(obj, u);

    setTimeout(() => {
      this.loadingData = false;

      this.loadingReportMessage = false;
      // this.clearAllSections();

    }, 1000);
  }

  getPercentage(n) {

    return Math.round(n) + ' %';

  }
  getTabsData(data?: any, dateType?: string) {

    this.loading = true;
    let obj: any = {
      zoneId: (this.selectedZone.id) ? this.selectedZone.id : -1,
      regionId: (this.selectedRegion.id) ? this.selectedRegion.id : -1,
      startDate: (dateType == 'start') ? moment(data).format('YYYY-MM-DD') : moment(this.startDate).format('YYYY-MM-DD'),
      endDate: (dateType == 'end') ? moment(data).format('YYYY-MM-DD') : moment(this.endDate).format('YYYY-MM-DD'),
      cityId: this.selectedCity.id || -1,
      distributionId: this.selectedDistribution.id || -1,
      storeType: this.selectedStoreType || null,
      channelId: -1
    }
    localStorage.setItem('obj', JSON.stringify(obj));
    this.getTableData(obj)

    this.httpService.getDashboardData(obj).subscribe(data => {
      // console.log(data, 'home data');
      const res: any = data
      if(res) {
      this.tabsData = data;
      }
      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {
      this.clearLoading()

      console.log(error, 'home error')

    })



  }
  getTableData(obj) {

    this.httpService.merchandiserShopListCBL(obj).subscribe(data => {
      console.log(data, 'table data');
      const res: any = data;

      if(res) {
      this.tableData = res;
      }
      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {
      this.clearLoading();

      console.log(error, 'home error');

    });
  }

  // getMerchandiserDetailPage(id){
  //   this.router.navigate
  // }

  selectAll(select: NgModel, values) {
    select.update.emit(values);
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }



}
