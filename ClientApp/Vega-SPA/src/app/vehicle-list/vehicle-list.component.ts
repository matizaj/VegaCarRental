import { MakeService } from './../services/make.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private readonly PAGE_SIZE = 3;

  vehicles: Vehicle[];
  makes: any[];
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE
  };

  constructor(private makeServices: MakeService) { }

  ngOnInit() {
    this.populateVehicles();
    this.makeServices.getMakes().subscribe((data: any[]) => this.makes = data);

  }

 private populateVehicles() {
    this.makeServices.getAllVehicles(this.query).subscribe((result: any) => {
      this.queryResult = result;
    });
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pagSize: this.PAGE_SIZE
    };
    this.populateVehicles();
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

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }

}
