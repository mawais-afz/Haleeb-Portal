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
        password: '',
        cbl:'Y'
    };
    loading=false;
    constructor(private router: Router, private httpService: DashboardService, private toastr: ToastrService) { }

    ngOnInit() {

        localStorage.clear();
     }

    onLogin(loginForm: any) {
        this.loading=true;
        console.log(loginForm);


        this.httpService.login(loginForm).subscribe((data:Response) => {
            const res: any = data;
            // console.log('data', data.headers);
            // this.toastr.success(res, 'Login Status');
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('user_id', res.user.id);
            localStorage.setItem('user_name', res.user.userName);
            localStorage.setItem('menu', JSON.stringify(res.list));

            this.router.navigate(['/dashboard']);
            setTimeout(() => {
                this.loading=false;
            }, 30000);

        }, error => {
            this.toastr.error(error.error.description, 'Login Status');
            console.log('error', error);


        });
    }
}
