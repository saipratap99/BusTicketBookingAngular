import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from '../../models/login.model';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.userService.authenticateUser(this.model)
      .subscribe({
        next: (v) => {
          console.log(v.headers.get('Authorization'),v);
          this.msg = "Welcome Back!"; 
          this.status = 'success';
          this.show = true;
          // this.passMsg.emit({msg: JSON.parse(JSON.stringify(v)).firstName, status: "success", show: true})
        },

        error: (err) => {
          console.log(err);
          this.msg = JSON.parse(JSON.stringify(err)).error; 
          this.status = 'danger';
          this.show = true;
          // this.passMsg.emit({msg: "Error creating", status: "danger", show: true});
        },

        complete: () => {
          console.log("Done")
          this.loginForm.reset();
        }
      })
    }
  }

}
