import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { AppRouting } from './app.routing.module';
import { MakeService } from './services/make.service';
import { HttpClientModule } from '@angular/common/http';
import { FeatureService } from './services/feature.service';
import { ToastyModule } from 'ng2-toasty';
import {AppErrorHandler} from 'app.error-handler';
import * as Raven from 'raven-js';
import { NotFoundComponent } from './not-found/not-found.component';

Raven.config('https://fc2877bb926945bda6a01cc8d0aa84c2@sentry.io/1452823').install();

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpClientModule,
    ToastyModule.forRoot()
  ],
  providers: [MakeService, FeatureService, {provide: ErrorHandler, useClass: AppErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
