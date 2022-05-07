import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { NewScheduleComponent } from './components/new-schedule/new-schedule.component';
import { ScheduleIndexComponent } from './components/schedule-index/schedule-index.component';
import { ShowScheduleComponent } from './components/show-schedule/show-schedule.component';
import { UpdateScheduleComponent } from './components/update-schedule/update-schedule.component';

const routes: Routes = [
  { path: '', component: ScheduleIndexComponent, canActivate: [AuthGuard] },
  { path: 'new', component: NewScheduleComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: UpdateScheduleComponent, canActivate: [AuthGuard] },
  { path: 'show/:id', component: ShowScheduleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
