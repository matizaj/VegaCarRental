import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get(this.url + '/api/features').pipe(map((response) => {
      return response;
    }));
  }
}
