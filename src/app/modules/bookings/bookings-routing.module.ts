import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBusesComponent } from './components/search-buses/search-buses.component';

const routes: Routes = [
  { path: 'search', component: SearchBusesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
