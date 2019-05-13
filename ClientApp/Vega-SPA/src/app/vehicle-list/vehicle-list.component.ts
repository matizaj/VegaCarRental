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
  query: any = {};

  constructor(private makeServices: MakeService) { }

  ngOnInit() {
    this.populateVehicles();
    this.makeServices.getMakes().subscribe((data: any[]) => this.makes = data);

  }

 private populateVehicles() {
    this.makeServices.getAllVehicles(this.query).subscribe((x: Vehicle[]) => this.vehicles = x);
  }

  onFilterChange() {
   this.populateVehicles();
  }

  resetFilter() {
    this.query = {};
    this.onFilterChange();
  }
  sortBy(columnName: string) {
    console.log('sort');
    if (this.query.sortBy === columnName) {
      this.query.isSortAsc = false;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAsc = true;
    }
    this.populateVehicles();
  }

}
