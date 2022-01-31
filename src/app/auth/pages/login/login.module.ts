import { NgModule } from '@angular/core';

import { SharedModule } from '../../../_shared/shared.module';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {MapModule} from "../../../map/map.module";

@NgModule({
    imports: [
        SharedModule,
        LoginPageRoutingModule,
        MapModule
    ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
