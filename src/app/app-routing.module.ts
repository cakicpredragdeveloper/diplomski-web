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
