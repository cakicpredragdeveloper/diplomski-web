import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleMonitoringPage } from './vehicle-monitoring.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleMonitoringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleMonitoringPageRoutingModule {}
