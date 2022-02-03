import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { VehicleMapComponent } from './components/vehicle-map/vehicle-map.component';



@NgModule({
  declarations: [ MapComponent, VehicleMapComponent ],
  imports: [
    CommonModule
  ],
  exports: [ MapComponent, VehicleMapComponent ]
})
export class MapModule { }
