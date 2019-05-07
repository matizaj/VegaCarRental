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
  allVehicles: Vehicle[];
  makes: any[];
<<<<<<< HEAD
  filter: any = {};
=======

>>>>>>> c18796abd286861eb91fd088ec8a9e68e850fb96
  constructor(private makeServices: MakeService) { }

  ngOnInit() {
    this.makeServices.getAllVehicles().subscribe((x: Vehicle[]) => this.vehicles = this.allVehicles = x);
    this.makeServices.getMakes().subscribe((data: any[]) => this.makes = data);

  }

  onFilterChange() {
    let vehicles = this.allVehicles;

    if (this.filter.makeId) {
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    }
    if (this.filter.modelId) {
      vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
    }
    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

}
