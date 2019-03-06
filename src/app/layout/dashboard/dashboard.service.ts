import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ip: any = '';
  user = 0;

  constructor(private http: HttpClient) { }

  login(cradentials: any) {

    const url = this.ip + 'pictureLogin';
    return this.http.post(url, cradentials);

  }

  getZone() {
    const filter = JSON.stringify({ act: 0, userId: this.user });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);

  }
}

