import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: any = {
        userName: '',
        password: ''
    };
    constructor(private router: Router, private httpService: DashboardService, private toastr: ToastrService) { }

    ngOnInit() {

        localStorage.clear();
     }

    onLogin(loginForm: any) {
        console.log(loginForm);


        this.httpService.login(loginForm).subscribe(data => {
            const res: any = data;
            console.log('data', data);
            // this.toastr.success(res, 'Login Status');
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('user_id', res.user_id);
            this.router.navigate(['/dashboard']);

        }, error => {
            this.toastr.error(error.error.description, 'Login Status');
            console.log('error', error);


        });
    }
}
