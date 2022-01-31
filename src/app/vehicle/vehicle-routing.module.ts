import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from '../_shared/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/vehicle-list/vehicle-list.module').then( m => m.VehicleListPageModule)
  },
  {
    path: 'vehicle-track-visualisation',
    loadChildren: () => import('./pages/vehicle-track-visualisation/vehicle-track-visualisation.module').then( m => m.VehicleTrackVisualisationPageModule)
  },
  {
    path: 'vehicle-monitoring',
    loadChildren: () => import('./pages/vehicle-monitoring/vehicle-monitoring.module').then( m => m.VehicleMonitoringPageModule)
  },
  {
    path: ':vehicleVin',
    loadChildren: () => import('./pages/vehicle-detail/vehicle-detail.module').then( m => m.VehicleDetailPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class VehicleRoutingModule { }
