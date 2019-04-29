import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';

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
}
