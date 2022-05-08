import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { NewSeatingComponent } from './components/new-seating/new-seating.component';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';
import { SeatingTypesComponent } from './components/seating-types/seating-types.component';

const routes: Routes = [
  { path: '', component: SeatingTypesComponent, canActivate: [AuthGuard] },
  { path: 'new', component: NewSeatingComponent, canActivate: [AuthGuard] },
  { path: 'schedule/:scheduleId/bus/:busId/:date/:time', component: SeatLayoutComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatsRoutingModule { }
