import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ToastBarComponent } from '../shared/components/toast-bar/toast-bar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class UserModule { }
