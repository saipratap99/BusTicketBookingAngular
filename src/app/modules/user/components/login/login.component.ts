import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: any;
  model: Login = new Login();

  // // toastBar Attributes
  // msg!: string;
  // status!: string;
  // show!: boolean ;
  loading: boolean = false;

  constructor(private authService: AuthService, private route: Router, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true;
      this.authService.authenticateUser(this.model)
      .subscribe({
        next: (v) => {
          const jwt  = v.headers.get('Authorization');
          this.msgCommunicationService.msgEvent.emit({msg: "Welcome back user!", status: "success", show: true})
          if(jwt)
            this.authService.setSession(jwt);
        },

        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(err)).error, status: "danger", show: true});
          this.loading = false;
        },

        complete: () => {
          this.loading = false;
          console.log("Done")
          // this.route.navigate(['/']);
          this.loginForm.reset();
        }
      })
    }
  }

}
