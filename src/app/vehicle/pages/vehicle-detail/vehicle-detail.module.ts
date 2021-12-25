import { NgModule } from '@angular/core';

import { VehicleDetailPageRoutingModule } from './vehicle-detail-routing.module';

import { VehicleDetailPage } from './vehicle-detail.page';
import { SharedModule } from '../../../_shared/shared.module';

@NgModule({
  imports: [
    SharedModule,

    VehicleDetailPageRoutingModule
  ],
  declarations: [VehicleDetailPage]
})
export class VehicleDetailPageModule {}
