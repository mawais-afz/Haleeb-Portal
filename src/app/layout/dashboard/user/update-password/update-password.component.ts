import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  loginForm: any = {
    oldPassword: '',
    password: '',
    confirmPassword:'',
    // cbl:'Y'
};
loading=false;
constructor(private router: Router, private httpService: DashboardService, private toastr: ToastrService) { }

ngOnInit() {

 }

onLogin(loginForm: any) {
    this.loading=true;
    console.log(loginForm);


    this.httpService.login(loginForm).subscribe((data:Response) => {
        const res: any = data;
        // console.log('data', data.headers);
        // this.toastr.success(res, 'Login Status');
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('today',moment(new Date).format('YYYY-MM-DD'))
        localStorage.setItem('user_id', res.user.user_id);
        localStorage.setItem('user_name', res.user.userName);
        localStorage.setItem('menu', JSON.stringify(res.list));

        this.router.navigate(['/dashboard']);
        setTimeout(() => {
            this.loading=false;
        }, 30000);

    }, error => {
        this.toastr.error(error.error.description, 'Login Status');
        console.log('error', error);
        this.loading=false;

        


    });
}

}
