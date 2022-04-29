import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: any;
  model: Login = new Login();

  // toastBar Attributes
  msg!: string;
  status!: string;
  show!: boolean ;
  loading: boolean = false;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true;
      this.authService.authenticateUser(this.model)
      .subscribe({
        next: (v) => {
          const jwt  = v.headers.get('Authorization');
          this.msg = "Welcome Back!"; 
          this.status = 'success';
          this.show = true;
          // this.passMsg.emit({msg: JSON.parse(JSON.stringify(v)).firstName, status: "success", show: true})
          
          if(jwt)
            this.authService.setSession(jwt);
        },

        error: (err) => {
          console.log(err);
          this.msg = JSON.parse(JSON.stringify(err)).error; 
          this.status = 'danger';
          this.show = true;
          this.loading = false;
          // this.passMsg.emit({msg: "Error creating", status: "danger", show: true});
        },

        complete: () => {
          this.loading = false;
          console.log("Done")
          this.route.navigate(['/']);
          this.loginForm.reset();
        }
      })
    }
  }

}
