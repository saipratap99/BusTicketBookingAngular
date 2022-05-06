import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { NewServiceDetailsComponent } from './components/new-service-details/new-service-details.component';
import { ServiceDetailsIndexComponent } from './components/service-details-index/service-details-index.component';
import { ShowServiceDetailsComponent } from './components/show-service-details/show-service-details.component';
import { UpdateServiceDetailsComponent } from './components/update-service-details/update-service-details.component';

const routes: Routes = [
  { path: '', component: ServiceDetailsIndexComponent, canActivate: [AuthGuard] },
  { path: 'new', component: NewServiceDetailsComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: UpdateServiceDetailsComponent, canActivate: [AuthGuard] },
  { path: 'show/:id', component: ShowServiceDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceDetailsRoutingModule { }
