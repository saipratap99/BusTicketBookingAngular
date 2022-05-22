import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusesRoutingModule } from './buses-routing.module';
import { NewBusComponent } from './components/new-bus/new-bus.component';
import { BusIndexComponent } from './components/bus-index/bus-index.component';
import { ShowBusComponent } from './components/show-bus/show-bus.component';
import { UpdateBusComponent } from './components/update-bus/update-bus.component';
import { BusDetailsFormComponent } from './components/bus-details-form/bus-details-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BusService } from './services/bus.service';
import { DeleteBusComponent } from './components/delete-bus/delete-bus.component';


@NgModule({
  declarations: [
    NewBusComponent,
    BusIndexComponent,
    ShowBusComponent,
    UpdateBusComponent,
    BusDetailsFormComponent,
    DeleteBusComponent
  ],
  imports: [
    CommonModule,
    BusesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [BusService]
})
export class BusesModule { }
