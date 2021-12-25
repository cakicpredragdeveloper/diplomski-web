import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers:[
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:    true
    }
  ],
  exports:
  [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class SharedModule { }
