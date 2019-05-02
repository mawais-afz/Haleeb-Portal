import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  ip:any='http://192.168.3.94:8080/audit/';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  UrlEncodeMaker(obj) {
    let url = '';
      for (const key in obj) {
      url += `${key}=${obj[key]}&`;
    }
    const newUrl = url.substring(0, url.length - 1);
    return newUrl;
  }

  getData(obj){
    let urlencoded=this.UrlEncodeMaker(obj)
    let url=this.ip+'shopList';
    return this.http.post(url,urlencoded,this.httpOptions);
  }


  getShopDetails(obj){
    let urlencoded=this.UrlEncodeMaker(obj)
    let url=this.ip+'evaluationShop';
    return this.http.post(url,urlencoded,this.httpOptions);
  }
}
