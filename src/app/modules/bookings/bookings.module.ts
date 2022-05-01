import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { SearchBusesComponent } from './components/search-buses/search-buses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvailableBusesComponent } from './components/available-buses/available-buses.component';


@NgModule({
  declarations: [
    SearchBusesComponent,
    AvailableBusesComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookingsModule { }
