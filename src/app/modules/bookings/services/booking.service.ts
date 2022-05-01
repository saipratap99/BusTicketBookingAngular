import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getLocation(locationName: string){
    return this.http.get(`http://localhost:8080/api/v1/search/location/${locationName}`);
  }
}
