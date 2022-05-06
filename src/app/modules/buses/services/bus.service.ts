import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  url = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  getAllSeatingTypes(){
    return this.http.get<any[]>(`${this.url}/seating-types/`);
  }

  busDetailsCreateAndUpdate(body: any,type: string, id?: number){
    if(type === 'create'){
      return this.http.post(`${this.url}/bus_details/create`, body);
    }else{
      return this.http.put(`${this.url}/bus_details/edit/${id}`, body);
    }
  }

  busDetailsRead(id?: number){
    return this.http.get(`${this.url}/bus_details/${id}`);
  }

  getAllBusDetails(){
    return this.http.get<any[]>(`${this.url}/bus_details/`);
  }
}
