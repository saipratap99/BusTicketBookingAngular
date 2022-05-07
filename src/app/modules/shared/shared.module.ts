import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastBarComponent } from './components/toast-bar/toast-bar.component';
import { AuthGuard } from './guard/auth.guard';
import { BannerComponent } from './components/banner/banner.component';
import { WeekDayPipe } from './pipes/week-day.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    ToastBarComponent,
    BannerComponent,
    WeekDayPipe
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
    BannerComponent,
    WeekDayPipe
  ]
})
export class SharedModule { }
