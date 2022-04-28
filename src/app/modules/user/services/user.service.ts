import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:8080/api/v1/users"

  constructor(private http: HttpClient) { }

  createUser(model: Signup){
    return this.http.post(`${this.url}/create`, model);
  }

  authenticateUser(model: Login){
    return this.http.post(`${this.url}/login`, model, {observe: 'response'});
  }

}
