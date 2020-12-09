import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Subject, of, BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {timeout, catchError} from 'rxjs/operators';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {config} from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {

    this.user_id = localStorage.getItem('user_id');
  }

  configFile = config;

  ip: any = this.configFile.ip;
  user_id: any = 0;
  private dataSource = new Subject();
  data = this.dataSource.asObservable();

  // ip: any = 'http://192.168.3.162:8080/audit/';

  // ip: any='http://192.168.3.142:8080/audit/';
  // ip: any = 'http://192.168.3.189:8080/audit/';
  // ip: any = 'http://192.168.3.94:8080/audit/';
  // ip: any = 'http://192.168.3.162:8080/audit/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  updatedDownloadStatus(data) {
    this.dataSource.next(data);
  }

  login(credentials: any) {
    // let body=JSON.stringify(credentials)
    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout')
    //     return of(null);
    //   })
    // );
  }

  updatePassword(obj) {
    const url = this.ip + 'change-password';
    return this.http.post(url, obj, this.httpOptions);
  }

  removePlanedCall(obj) {
    obj = this.UrlEncodeMaker(obj);
    const url = this.ip + 'remove-plan-call';
    return this.http.post(url, obj, this.httpOptions);
  }

  UrlEncodeMaker(obj) {
    let url = '';
    for (const key in obj) {
      url += `${key}=${obj[key]}&`;
    }
    const newUrl = url.substring(0, url.length - 1);
    return newUrl;
  }

  getDashboardData(obj) {
    let body = null;
    if (obj != null) {
      body = this.UrlEncodeMaker(obj);
      // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
    }
    const url = this.ip + 'dashboardDataCBL';
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );

  }

  checkDate() {
    // let date=new Date()
    // let today=localStorage.getItem('today');
    // if(today && moment(date).format('YYYY-MM-DD')!==today){
    //   localStorage.clear();
    //   alert('Your session is expired ,please login again.');
    //   this.router.navigate(['/login']);
    // }
  }

  getLineChartData() {
    const url = this.ip + 'completionData';
    return this.http.post(url, {}, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getTableList(obj) {
    const body = this.UrlEncodeMaker(obj);
    // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&merchandiserId=${obj.merchandiserId}`;
    const url = this.ip + 'completedShopListCBL';
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getMerchandiserListForEvaluation(obj) {

    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'merchandiserList';
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  merchandiserShopListCBL(obj) {
    const body = `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
    const url = this.ip + 'merchandiserShopListCBL';
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  //#region FILTER CALL
  getZone() {

    this.user_id = localStorage.getItem('user_id');
    const filter = JSON.stringify({act: 0, userId: this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getQueryTypeList() {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({act: 12, userId: this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getReportList() {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({act: 14, userId: this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  updateRouteStatus(obj) {

    const url = this.ip + 'shopWiseRouteCount';
    return this.http.post(url, obj);
  }

  displayRouteStatus(obj) {

    const url = this.ip + 'shopWiseRouteCount';
    return this.http.post(url, obj);
  }

  deleteRoutes(obj) {

    const url = this.ip + 'shopWiseRouteCount';
    return this.http.post(url, obj);
  }

  getRemarksList() {
    const filter = JSON.stringify({act: 11});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getRegion(zoneId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({act: 1, zoneId: zoneId, userId: this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }


  getRegions() {
    const url = this.ip + 'loadFilters';
    const filter = JSON.stringify({act: 13});
    return this.http.post(url, filter);

  }

  getCities(regionId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({act: 2, regionId: regionId, userId: this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getProducts(categoryId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({act: 5, category: categoryId, userId: this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getAreas(channelId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({act: 3, channelId: channelId, userId: this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getMerchandiserList(obj) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({act: 4, regionId: obj.regionId, zoneId: obj.zoneId, date: obj.startDate, userId: this.user_id});
    const url = this.ip + 'loadFilters';

    // const url = this.ip + 'cbl-pdf';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  //#endregion


  downloadMerchandiserPDF(obj) {
    const httpParams = new FormData();
    httpParams.append('reportType', '');
    httpParams.append('zoneId', obj.zoneId);
    httpParams.append('regionId', obj.regionId);
    httpParams.append('startDate', obj.startDate);
    httpParams.append('surveyorId', obj.surveyorId);


    const url = this.ip + `cbl-pdf`;
    const o = `surveyorId=${obj.surveyorId}&startDate=${obj.startDate}`;
    return this.http.post(url, o, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getKeyForProductivityReport(body, reportUrl) {
    this.updatedDownloadStatus(true);
    const url = this.ip + reportUrl;
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  public DownloadResource(obj, url) {
    let path;

    path = this.ip + url;


    const form = document.createElement('form');

    form.setAttribute('action', path);

    form.setAttribute('method', 'post');
    // form.setAttribute('target', '_blank');

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);


  }

  private appendInputToForm(form, obj) {
    Object.keys(obj).forEach(key => {
      const input = document.createElement('input');

      input.setAttribute('value', obj[key]);

      input.setAttribute('name', key);

      form.appendChild(input);
    });
  }


  updateImeiStatus(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + 'add-imei-update-imei-status';
    return this.http.post(url, body, this.httpOptions);
  }

  getImeis() {
    const url = this.ip + 'add-imei-update-imei-status';
    return this.http.get(url, this.httpOptions);
  }

  uploadImei(obj) {
    const url = this.ip + 'add-imei-update-imei-status';
    // @ts-ignore
    return this.http.post(url, obj
    );
  }


  uploadRoutes(obj) {
    const url = this.ip + 'UploadRoutesControllerNew';
    return this.http.post(url, obj);
  }
  getKey(obj) {
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(this.ip + 'tableauTicket',  body, this.httpOptions);
  }


  getEvaluationSummary(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "evaluatorSummaryData";
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getEvaluatorList() {
    const filter = JSON.stringify({ act: 15 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }
}
