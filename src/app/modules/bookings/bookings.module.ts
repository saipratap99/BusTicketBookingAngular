import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { SearchBusesComponent } from './components/search-buses/search-buses.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchBusesComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookingsModule { }
