import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../user/models/login.model';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:8080/api/v1/users"
  constructor(private http: HttpClient) { 

  }

  authenticateUser(model: Login){
    return this.http.post(`${this.url}/login`, model, {observe: 'response'});
  }

  setSession(jwt: string){
    const expiresAt = moment().add(10*60*60, 'second');

    localStorage.setItem('token', jwt);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(){
    const expiration = localStorage.getItem("expires_at");
    if(expiration == null)
      return moment();
    const expiresAt = JSON.parse(expiration );
    return moment(expiresAt);
  }
}
