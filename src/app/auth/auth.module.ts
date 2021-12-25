import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { NgModule } from '@angular/core';
import {authFeatureKey, authReducer} from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,

    AuthRoutingModule,

    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule { }
