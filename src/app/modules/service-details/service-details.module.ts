import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceDetailsRoutingModule } from './service-details-routing.module';
import { NewServiceDetailsComponent } from './components/new-service-details/new-service-details.component';
import { ShowServiceDetailsComponent } from './components/show-service-details/show-service-details.component';
import { UpdateServiceDetailsComponent } from './components/update-service-details/update-service-details.component';
import { ServiceDetailsFormComponent } from './components/service-details-form/service-details-form.component';
import { ServiceDetailsIndexComponent } from './components/service-details-index/service-details-index.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewServiceDetailsComponent,
    ShowServiceDetailsComponent,
    UpdateServiceDetailsComponent,
    ServiceDetailsFormComponent,
    ServiceDetailsIndexComponent,
  ],
  imports: [
    CommonModule,
    ServiceDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ServiceDetailsModule { }
