import { SharedModule } from './../../../_shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleMonitoringPageRoutingModule } from './vehicle-monitoring-routing.module';

import { VehicleMonitoringPage } from './vehicle-monitoring.page';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChartsModule,
    VehicleMonitoringPageRoutingModule
  ],
  declarations: [VehicleMonitoringPage]
})
export class VehicleMonitoringPageModule {}
