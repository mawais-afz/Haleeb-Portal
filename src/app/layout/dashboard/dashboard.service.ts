import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ip: any = environment.ip;
  // 'http://192.168.3.189:8080/audit/'
  user = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);
  }
  getDashboardData(obj) {
    let body = `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}`
    const url = this.ip + 'dashboardDataCBL'
    return this.http.post(url, body, this.httpOptions);

  }
  //#region FILTER CALL
  getZone() {
    const filter = JSON.stringify({ act: 0 });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getRegion(zoneId) {
    const filter = JSON.stringify({ act: 1, zoneId: zoneId });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getCities(regionId) {
    const filter = JSON.stringify({ act: 2, regionId: regionId });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getProducts(categoryId) {
    const filter = JSON.stringify({ act: 4, categoryId: categoryId });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getAreas(channelId) {
    const filter = JSON.stringify({ act: 3, channelId: channelId });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }
  getMerchandiserList(obj) {
    const filter = JSON.stringify({ act: 4, regionId: obj.regionId, zoneId: obj.zoneId, date: obj.startDate });
    const url = this.ip + 'loadFilters';

    // const url = this.ip + 'cbl-pdf';
    return this.http.post(url, filter);
  }
  //#endregion


  getOOSShopListKey(obj) {

  }
  downloadMerchandiserPDF(obj) {
    let httpParams = new FormData();
    httpParams.append('reportType', '');
    httpParams.append('zoneId', obj.zoneId);
    httpParams.append('regionId', obj.regionId);
    httpParams.append('startDate', obj.startDate);
    httpParams.append('surveyorId', obj.surveyorId);


    const url = this.ip + `cbl-pdf`;
    let o = `surveyorId=${obj.surveyorId}&startDate=${obj.startDate}`;
    return this.http.post(url, o, this.httpOptions);
  }
  getKeyForProductivityReport(obj) {
    let url = this.ip + 'productivityreport';

    let body = `type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&totalShops=${obj.totalShops}`
    return this.http.post(url, body, this.httpOptions);
  }
  public DownloadResource(obj, url) {
    let path;

    path = this.ip + url;


    let form = document.createElement('form');

    form.setAttribute('action', path);

    form.setAttribute('method', 'post');

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);
  }
  private appendInputToForm(form, obj) {
    Object.keys(obj).forEach(key => {
      let input = document.createElement('input');

      input.setAttribute('value', obj[key]);

      input.setAttribute('name', key);

      form.appendChild(input);
    });
  }


}
