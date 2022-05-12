import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalVars } from '../../shared/models/urls.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  url: string = `${globalVars.backendAPI}`;
  
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

  scheduleDetailsRead(id: number){
    return this.http.get(`${this.url}/schedule/${id}`);
  }

  getAllScheduleDetails(){
    return this.http.get<any[]>(`${this.url}/schedule/`);
  }
}
