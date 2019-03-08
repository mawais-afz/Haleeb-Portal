import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ip: any = environment.ip;
  user = 0;


  constructor(private http: HttpClient) { }

  login(credentials: any) {

    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);

  }



  getZone() {
    const filter = JSON.stringify({ act: 0});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);

  }
}

