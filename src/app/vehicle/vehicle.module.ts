import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { MapModule } from '../map/map.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MapModule,

    VehicleRoutingModule
  ]
})
export class VehicleModule { }
