import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeatsRoutingModule } from './seats-routing.module';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';
import { SeatingTypesComponent } from './components/seating-types/seating-types.component';
import { NewSeatingComponent } from './components/new-seating/new-seating.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SeatLayoutComponent,
    SeatingTypesComponent,
    NewSeatingComponent
  ],
  imports: [
    CommonModule,
    SeatsRoutingModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule
  ]
})
export class SeatsModule { }
