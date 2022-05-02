import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';

const routes: Routes = [
  { path: 'schedule/:scheduleId/bus/:busId/:date/:time', component: SeatLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatsRoutingModule { }
