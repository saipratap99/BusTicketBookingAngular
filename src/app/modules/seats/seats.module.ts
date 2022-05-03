import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeatsRoutingModule } from './seats-routing.module';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';


@NgModule({
  declarations: [
    SeatLayoutComponent
  ],
  imports: [
    CommonModule,
    SeatsRoutingModule,
    FontAwesomeModule
  ]
})
export class SeatsModule { }
