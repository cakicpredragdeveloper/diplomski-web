import { NgModule } from '@angular/core';

import { FinderPageRoutingModule } from './finder-routing.module';

import { FinderPage } from './finder.page';
import { SharedModule } from '../../../_shared/shared.module';
import { MapModule } from '../../../map/map.module';

@NgModule({
  imports: [
    SharedModule,
    MapModule,

    FinderPageRoutingModule,
  ],
  declarations: [FinderPage]
})
export class FinderPageModule {}
