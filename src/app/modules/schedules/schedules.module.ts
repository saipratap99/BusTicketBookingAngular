import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { NewScheduleComponent } from './components/new-schedule/new-schedule.component';
import { ScheduleIndexComponent } from './components/schedule-index/schedule-index.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { ShowScheduleComponent } from './components/show-schedule/show-schedule.component';
import { UpdateScheduleComponent } from './components/update-schedule/update-schedule.component';
import { ScheduleService } from './services/schedule.service';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewScheduleComponent,
    ScheduleIndexComponent,
    ScheduleFormComponent,
    ShowScheduleComponent,
    UpdateScheduleComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [ScheduleService]
})
export class SchedulesModule { }
