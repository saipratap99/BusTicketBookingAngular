import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  url: string = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }


  getAllServices(){
    return this.http.get<any[]>(`${this.url}/service_details/`);
  }

  getAllBuses(){
    return this.http.get<any[]>(`${this.url}/bus_details/`);
  }

  scheduleDetailsDetailsCreateAndUpdate(body: any,type: string, id?: number){
    if(type === 'create'){
      return this.http.post(`${this.url}/schedule/create`, body);
    }else{
      return this.http.put(`${this.url}/schedule/edit/${id}`, body);
    }
  }

}
