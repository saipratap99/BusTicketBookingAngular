import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersIndexComponent } from './components/users-index/users-index.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

const routes: Routes = [
  { path: '',  component: UsersIndexComponent, canActivate: [AuthGuard]},
  { path: 'new', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: ':id/verify/otp', component: VerifyOtpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
