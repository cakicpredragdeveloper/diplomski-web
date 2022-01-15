import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleTrackVisualisationPageRoutingModule } from './vehicle-track-visualisation-routing.module';

import { VehicleTrackVisualisationPage } from './vehicle-track-visualisation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleTrackVisualisationPageRoutingModule
  ],
  declarations: [VehicleTrackVisualisationPage]
})
export class VehicleTrackVisualisationPageModule {}
