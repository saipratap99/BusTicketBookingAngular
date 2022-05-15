import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ToastBarComponent } from '../shared/components/toast-bar/toast-bar.component';
import { SharedModule } from '../shared/shared.module';
import { UsersIndexComponent } from './components/users-index/users-index.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    UsersIndexComponent,
    VerifyOtpComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class UserModule { }
