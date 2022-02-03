import { NgModule } from '@angular/core';
import { SharedModule } from '../../../_shared/shared.module';
import { MapModule } from '../../../map/map.module';

import { VehicleFinderPageRoutingModule } from './vehicle-finder-routing.module';
import { VehicleFinderPage } from './vehicle-finder.page';

@NgModule({
  imports: [
    SharedModule,
    MapModule,

    VehicleFinderPageRoutingModule
  ],
  declarations: [VehicleFinderPage]
})
export class VehicleFinderPageModule {}
