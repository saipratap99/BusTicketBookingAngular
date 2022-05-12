import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  loading: boolean = false;
  redirectURL: string | null = ''; 

  constructor(private authService: AuthService, private router: Router, private msgCommunicationService: MsgCommunicationService, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.queryParamMap.subscribe(params => {
      this.redirectURL = params.get('redirectURL') != null ? params.get('redirectURL') : '';;    
      console.log( this.redirectURL)
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true;
      this.authService.authenticateUser(this.model)
      .subscribe({
        next: (data) => {
          // console.log(data, JSON.parse(JSON.stringify(data))?.body?.jwt);
          const jwt = JSON.parse(JSON.stringify(data))?.body?.jwt;
          const refreshToken = JSON.parse(JSON.stringify(data))?.body?.refreshToken;
          // console.log(jwt)
          this.msgCommunicationService.msgEvent.emit({msg: "Welcome back user!", status: "success", show: true})
          if(jwt)
            this.authService.setSession('Bearer ' + jwt, refreshToken);
          this.router.navigate([this.redirectURL]);
          this.loginForm.reset();
        },
        error: (err) => {
          this.loading = false;
        },

        complete: () => {
          this.loading = false;
        }
      })
    }
  }

}
