import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../_shared/shared.module";
import {VehicleRoutingModule} from "./vehicle-routing.module";



@NgModule({
  declarations: [],
  imports: [
    SharedModule,

    VehicleRoutingModule
  ]
})
export class VehicleModule { }
