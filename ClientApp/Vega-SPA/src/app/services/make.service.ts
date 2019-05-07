import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { ToastyService } from 'ng2-toasty';
import { SaveVehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  url = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get(this.url + '/api/makes').pipe(map((response) => {
      return response;
    }));
  }

  create(vehicle: SaveVehicle) {
    return this.http.post(this.url + '/api/vehicles', vehicle).pipe(map((response) => {
      return response;
    }));
  }

  getVehicle(id) {
    return this.http.get(this.url + '/api/vehicles/' + id);
  }
  update(vehicle: SaveVehicle) {
    return this.http.put(this.url + '/api/vehicles/' + vehicle.id, vehicle, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/api/vehicles/' + id);
  }

  getAllVehicles() {
    return this.http.get(this.url + '/api/vehicles');
  }
}
