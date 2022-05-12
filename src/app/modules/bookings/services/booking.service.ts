import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';
import { globalVars } from '../../shared/models/urls.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  url: string = `${globalVars.backendAPI}`;
  constructor(private http: HttpClient) { }

  getLocation(locationName: string){
    return this.http.get<any[]>(`${this.url}/search/location/${locationName}`);
  }

  getBuses(departureLocation: Location, arrivalLocation: Location, date: string | null){
    return this.http.get<any[]>(`${this.url}/search/buses/${departureLocation.locationName}/${departureLocation.id}/${arrivalLocation.locationName}/${arrivalLocation.id}/${date}`);
  }

  getBookingDetails(bookingId: number){
    return this.http.get(`${this.url}/booking/confirm/${bookingId}`);
  }

  confirmBooking(id: number){
    return this.http.post(`${this.url}/booking/confirm/${id}`, {});
  }

  getAllSuccessBookings(){
    return this.http.get<any[]>(`${this.url}/booking/`);
  }
}
