import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
  title='completed shop list'
  tableData: any = [];
  loading: boolean = false;
  ip='http://192.168.3.152:8080/audit/';
  // environment.ip

  constructor(private httpService: DashboardService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = 0
    let o: any = JSON.parse(localStorage.getItem('obj'));
    console.log(o)
    this.activatedRoute.params.subscribe(p => {
      id = p.id
      let obj = {
        zoneId: o.zoneId,
        regionId: o.regionId,
        startDate: o.startDate,
        endDate: o.endDate,
        merchandiserId: id,
        // cityId: o.cityId || -1,
        // distributionId:o.selectedDitribution.id ||-1,
        // storeType:o.selectedStoreType || null,
      }
      this.getTableData(obj);
    })

  }
  getTableData(obj) {
    this.loading = true;
    this.httpService.getTableList(obj).subscribe(data => {
      console.log(data, 'table data');
      let res: any = data
      // this.dataSource = res;
      if(res!=null)
      this.tableData = res;
      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {
      console.log(error, 'home error')

    })
  }

  getPdf(item){
    // debugger
    let obj={
      surveyId:item.surveyId,
      type:25,
      shopName:item.shopName
    }
    let url='url-pdf'
    this.httpService.DownloadResource(obj,url)

  }
}
