import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AvailableBusesComponent } from './components/available-buses/available-buses.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';
import { ConfirmBookingComponent } from './components/confirm-booking/confirm-booking.component';
import { SearchBusesComponent } from './components/search-buses/search-buses.component';

const routes: Routes = [
  { path: '', component: BookingDetailsComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchBusesComponent },
  { path: 'search/:depLocation/:depId/:arrLocation/:arrId/:date', component: AvailableBusesComponent },
  { path: 'confirm/:bookingId', component: ConfirmBookingComponent, canActivate: [AuthGuard]},
  { path: 'success/:bookingId', component: BookingSuccessComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
