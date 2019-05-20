import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  url = environment.apiUrl + '/api/vehicles/';
  constructor(private http: HttpClient) {  }
  upload(vehicleId, photo) {
    const formData = new FormData();
    formData.append('file', photo);
    return this.http.post(`${this.url}/${vehicleId}/photos`, formData).pipe(map((response) => {
      return response;
    }));
}
}
