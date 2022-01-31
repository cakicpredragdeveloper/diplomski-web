import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { MapModule } from '../map/map.module';
import {FinderRoutingModule} from "./finder-routing.module";


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MapModule,

    FinderRoutingModule
  ]
})
export class FinderModule { }
