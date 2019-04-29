import { Routes, RouterModule } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NgModule } from '@angular/core';

const approutes: Routes = [
    {path: 'vehicle', component: VehicleFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(approutes)],
    exports: [RouterModule]
})
export class AppRouting {}
