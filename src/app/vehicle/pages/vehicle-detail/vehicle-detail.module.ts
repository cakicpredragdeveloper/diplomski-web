import { NgModule } from '@angular/core';

import { VehicleDetailPageRoutingModule } from './vehicle-detail-routing.module';

import { VehicleDetailPage } from './vehicle-detail.page';
import { SharedModule } from '../../../_shared/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    SharedModule,
    ChartsModule,
    VehicleDetailPageRoutingModule
  ],
  declarations: [VehicleDetailPage]
})
export class VehicleDetailPageModule {}
