import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { BusIndexComponent } from './components/bus-index/bus-index.component';
import { DeleteBusComponent } from './components/delete-bus/delete-bus.component';
import { NewBusComponent } from './components/new-bus/new-bus.component';
import { ShowBusComponent } from './components/show-bus/show-bus.component';
import { UpdateBusComponent } from './components/update-bus/update-bus.component';

const routes: Routes = [
  { path: '', component: BusIndexComponent, canActivate: [AuthGuard] },
  { path: 'new', component: NewBusComponent,  canActivate: [AuthGuard] },
  { path: 'edit/:id', component: UpdateBusComponent, canActivate: [AuthGuard] },
  { path: 'show/:id', component: ShowBusComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: DeleteBusComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusesRoutingModule { }
