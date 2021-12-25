import { NgModule } from '@angular/core';

import { VehicleListPageRoutingModule } from './vehicle-list-routing.module';

import { VehicleListPage } from './vehicle-list.page';
import { SharedModule } from '../../../_shared/shared.module';

@NgModule({
  imports: [
    SharedModule,

    VehicleListPageRoutingModule
  ],
  declarations: [VehicleListPage]
})
export class VehicleListPageModule {}
