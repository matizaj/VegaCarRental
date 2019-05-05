import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get(this.url + '/api/makes').pipe(map((response) => {
      return response;
    }));
  }

  create(vehicle) {
    return this.http.post(this.url + '/api/vehicles', vehicle);
  }

  getVehicle(id) {
    return this.http.get(this.url + '/api/vehicles/' + id);
  }
}
