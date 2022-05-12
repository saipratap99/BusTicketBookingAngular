import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _default from '@popperjs/core/lib/modifiers/popperOffsets';
import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';
import { globalVars } from '../../shared/models/urls.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = `${globalVars.backendAPI}/users`

  constructor(private http: HttpClient) { }

  createUser(model: Signup){
    return this.http.post(`${this.url}/create`, model);
  }

  authenticateUser(model: Login){
    return this.http.post(`${this.url}/login`, model, {observe: 'response'});
  }

  getAllUsers(){
    return this.http.get<any[]>(`${this.url}/`);
  }

  alterRole(id: number, role: string){
    let operator: string | null = ''
    if(role == 'ROLE_USER')
      operator = prompt("Enter operator name: ", '');

    return this.http.post(`${this.url}/${id}/alter-role?operatorName=${operator}`,{});
  }

}
