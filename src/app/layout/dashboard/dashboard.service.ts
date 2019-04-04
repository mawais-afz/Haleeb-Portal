import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ip: any = environment.ip;
  //  'http://192.168.3.94:8080/audit/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient, private toastr: ToastrService) { }

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
      body = `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
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

  getTableList(obj) {
    const body = `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&merchandiserId=${obj.merchandiserId}`;
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
    const filter = JSON.stringify({ act: 0 });
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

  getRegion(zoneId) {
    const filter = JSON.stringify({ act: 1, zoneId: zoneId });
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

  getCities(regionId) {
    const filter = JSON.stringify({ act: 2, regionId: regionId });
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
    const filter = JSON.stringify({ act: 5, category: categoryId });
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
    const filter = JSON.stringify({ act: 3, channelId: channelId });
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
    const filter = JSON.stringify({ act: 4, regionId: obj.regionId, zoneId: obj.zoneId, date: obj.startDate });
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


}
