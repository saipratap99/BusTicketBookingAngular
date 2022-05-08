import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  url: string = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) { }

  getAvailableSeats(scheduleId: number, busId: number, doj: any, time: any){
    return this.http.get<any[]>(`${this.url}/seats/schedule/${scheduleId}/bus/${busId}/${doj}/${time}`)
  }

  bookSelectedSeats(model: any){
    return this.http.post<any>(`${this.url}/booking/new`, model);
  }

  createNewSeatLayout(model: any){
    return this.http.post(`${this.url}/seats/new`, model);
  }

  getAllSeatingTypes(){
    return this.http.get<any[]>(`${this.url}/seating-types/`);
  }
}
