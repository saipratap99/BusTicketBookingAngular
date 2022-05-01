import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'users', loadChildren: () => import("./modules/user/user.module").then(module => module.UserModule) },
  { path: 'bookings', loadChildren: () => import("./modules/bookings/bookings.module").then(module => module.BookingsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
