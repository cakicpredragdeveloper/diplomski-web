import { NgModule } from '@angular/core';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { SharedModule } from '../../../_shared/shared.module';

@NgModule({
  imports: [
    SharedModule,

    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
