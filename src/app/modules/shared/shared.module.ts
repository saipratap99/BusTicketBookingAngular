import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastBarComponent } from './components/toast-bar/toast-bar.component';
import { AuthGuard } from './guard/auth.guard';


@NgModule({
  declarations: [
    NavbarComponent,
    ToastBarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    NavbarComponent,
    ToastBarComponent,
  ]
})
export class SharedModule { }
