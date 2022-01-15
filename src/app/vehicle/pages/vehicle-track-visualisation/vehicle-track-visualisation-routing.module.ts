import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleTrackVisualisationPage } from './vehicle-track-visualisation.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleTrackVisualisationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleTrackVisualisationPageRoutingModule {}
