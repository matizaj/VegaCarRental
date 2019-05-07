import { MakeService } from './../services/make.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: any[];

  constructor(private makeServices: MakeService) { }

  ngOnInit() {
    this.makeServices.getAllVehicles().subscribe((x: Vehicle[]) => this.vehicles = x);
    this.makeServices.getMakes().subscribe((data: any[]) => this.makes = data);

  }

}
