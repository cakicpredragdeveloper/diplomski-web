import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicle/vehicle.module').then( m => m.VehicleModule)
  },
  {
    path: 'vehicle-track-visualisation',
    loadChildren: () => import('./vehicle/pages/vehicle-track-visualisation/vehicle-track-visualisation.module').then( m => m.VehicleTrackVisualisationPageModule)
  },
  {
    path: 'vehicle-monitoring',
    loadChildren: () => import('./vehicle/pages/vehicle-monitoring/vehicle-monitoring.module').then( m => m.VehicleMonitoringPageModule)
  },
  {
    path: 'finder',
    loadChildren: () => import('./finder/finder.module').then( m => m.FinderModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
