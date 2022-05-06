import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailsService {

  url: string = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient ) { }

  getAllLocations(){
    return this.http.get<any[]>(`${this.url}/locations/`);
  }

  serviceDetailsCreateAndUpdate(body: any, type: string, id?: number){
    if(type === 'create'){
      return this.http.post(`${this.url}/service_details/create`, body);
    }else{
      return this.http.put(`${this.url}/service_details/edit/${id}`, body);
    }
    
  }

  serviceDetailsRead(id: number){
    return this.http.get(`${this.url}/service_details/${id}`);
  }

  getAllServiceDetails(){
    return this.http.get<any[]>(`${this.url}/service_details/`);
  }
}
