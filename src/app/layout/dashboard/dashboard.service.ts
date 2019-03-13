import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ip: any = environment.ip;
  user = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/ms-excel'
    })
  };

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);
  }

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

  downloadOOSDetail(obj) {
    const formData = new FormData();


    for (const key in obj) {
      formData.append(key, obj[key]);
    }

// tslint:disable-next-line: max-line-length
    let body=`areaId=${obj.areaId}&distId=${obj.distId}&actionType=${obj.actionType}&zoneId=${obj.zoneId}&regionId=${obj.regionId}&chennalId=${obj.channelId}&startDate=${obj.startDate}&endDate=${obj.endDate}&pageType=8`

    const url =  'http://192.168.3.240:8080/audit/oosDetail';
    // this.ip + \'oosDetail\''

    return this.http.post(url, formData, this.httpOptions);
  }

  public DownloadResource(obj){

    let path;

    path = 'http://192.168.3.240:8080/audit/oosDetail';
    

    let form = document.createElement("form");

    form.setAttribute("action", path);
    
    form.setAttribute("method","post");
    
    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);

  }
  private appendInputToForm(form, obj){

    
    
    Object.keys(obj).forEach((key)=>{

       let input = document.createElement("input");

       input.setAttribute("value", obj[key]);
       
       input.setAttribute("name", key);
       
       form.appendChild(input);

    });

 }
}
