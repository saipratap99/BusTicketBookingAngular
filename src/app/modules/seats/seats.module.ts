import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeatsRoutingModule } from './seats-routing.module';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';


@NgModule({
  declarations: [
    SeatLayoutComponent
  ],
  imports: [
    CommonModule,
    SeatsRoutingModule
  ]
})
export class SeatsModule { }
