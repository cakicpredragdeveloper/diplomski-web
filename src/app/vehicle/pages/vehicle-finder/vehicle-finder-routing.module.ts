import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleFinderPage } from './vehicle-finder.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleFinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleFinderPageRoutingModule {}
