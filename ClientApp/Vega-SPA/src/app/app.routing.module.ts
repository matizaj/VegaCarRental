import { Routes, RouterModule } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';

const approutes: Routes = [
    {path: 'vehicles', component: VehicleFormComponent},
    {path: 'vehicles/:id', component: VehicleFormComponent},
    {path: 'not-found', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(approutes)],
    exports: [RouterModule]
})
export class AppRouting {}
