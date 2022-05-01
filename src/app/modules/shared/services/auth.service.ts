import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../user/models/login.model';
import * as moment from "moment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:8080/api/v1/users"
  private payLoad: any = undefined;
  
  constructor(private http: HttpClient, private router: Router) { 

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
    this.payLoad = undefined;
    this.router.navigate(['/']);
  }

  isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }
  
  getExpiration(){
    const expiration = localStorage.getItem("expires_at");
    if(expiration == null)
      return moment();
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private getPayLoad(){
    const token = localStorage.getItem('token');
    if(token){
      const jwt = token.split(" ");
      if(jwt && jwt.length == 2 && jwt[1] != undefined){
        return jwt[1].split(".")[1];
      }

    }
    return undefined;
  }

  private getRole(){
    if(this.payLoad)
      return this.payLoad.role;
    // console.log("getRole");
    const payLoad = this.getPayLoad();
    if(payLoad){
      this.payLoad = JSON.parse(atob(payLoad));
      return this.payLoad.role;
    }else
      return undefined;
  }

  isOperator(){
    return this.getRole() === 'ROLE_OPERATOR';
  }

  isAdmin(){
    return this.getRole() === 'ROLE_ADMIN';
  }

  isOperatorOrAdmin(){
    const role = this.getRole();
    return role === 'ROLE_OPERATOR' || role === 'ROLE_ADMIN';
  }
}
