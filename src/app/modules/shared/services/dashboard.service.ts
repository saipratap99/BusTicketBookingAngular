import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalVars } from '../models/urls.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: string = `${globalVars.backendAPI}/dashboard`;

  constructor(private http: HttpClient) { }

  getOperatorName(){
    return this.http.get(`${this.url}/get-operator-name`);
  }

  getBookingStats(){
    return this.http.get(`${this.url}/bookings`);
  }

  getScheduleStats(){
    return this.http.get(`${this.url}/schedules`);
  }

  getServiceStats(){
    return this.http.get(`${this.url}/services`);
  }

  getBusStats(){
    return this.http.get(`${this.url}/buses`);
  }

  getUserStats(){
    return this.http.get(`${this.url}/users`);
  }

}
