import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { AppRouting } from './app.routing.module';
import { MakeService } from './services/make.service';
import { HttpClientModule } from '@angular/common/http';
import { FeatureService } from './services/feature.service';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpClientModule
  ],
  providers: [MakeService, FeatureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
