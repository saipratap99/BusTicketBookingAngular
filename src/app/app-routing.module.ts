import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './modules/shared/components/dashboard/dashboard.component';
import { AuthGuard } from './modules/shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'users', loadChildren: () => import("./modules/user/user.module").then(module => module.UserModule) },
  { path: 'bookings', loadChildren: () => import("./modules/bookings/bookings.module").then(module => module.BookingsModule)},
  { path: 'seats', loadChildren: ()=> import("./modules/seats/seats.module").then(module => module.SeatsModule) },
  { path: 'buses', loadChildren: () => import("./modules/buses/buses.module").then(module => module.BusesModule) },
  { path: 'services', loadChildren: () => import("./modules/service-details/service-details.module").then(module => module.ServiceDetailsModule) },
  { path: 'schedules', loadChildren: () => import("./modules/schedules/schedules.module").then(module => module.SchedulesModule) },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
