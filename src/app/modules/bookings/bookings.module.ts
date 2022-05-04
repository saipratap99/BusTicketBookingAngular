import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { SearchBusesComponent } from './components/search-buses/search-buses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvailableBusesComponent } from './components/available-buses/available-buses.component';
import { ConfirmBookingComponent } from './components/confirm-booking/confirm-booking.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';
import { BookingDetailsOverviewComponent } from './components/booking-details-overview/booking-details-overview.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';


@NgModule({
  declarations: [
    SearchBusesComponent,
    AvailableBusesComponent,
    ConfirmBookingComponent,
    BookingSuccessComponent,
    BookingDetailsOverviewComponent,
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookingsModule { }
