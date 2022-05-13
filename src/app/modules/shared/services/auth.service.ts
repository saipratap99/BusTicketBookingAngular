import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../user/models/login.model';
import * as moment from "moment";
import { Router } from '@angular/router';
import { globalVars } from '../models/urls.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${globalVars.backendAPI}/users`
  private payLoad: any = undefined;
  
  constructor(private http: HttpClient, private router: Router) { 

  }

  authenticateUser(model: Login){
    return this.http.post(`${this.url}/login`, model, {observe: 'response'});
  }

  setSession(jwt: string){
    const expiresAt = moment().add(60 * 60 * 10, 'second');

    this.setAccessToken(jwt);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
  }

  setAccessToken(jwt: string){
    console.log("Access token added");
    localStorage.setItem('token', jwt);
  }

  logOut(){
    if(confirm("Are you sure to logout?")){
      this.clearSession();
    }
  }

  clearSession(){
      localStorage.clear();
      this.payLoad = undefined;
      this.router.navigate(['/']);
  }

  isLoggedIn(){
    if(!localStorage.getItem('token'))
        return false;
    if(!moment().isBefore(this.getExpiration())){
      localStorage.clear()
      this.payLoad = undefined;
    }
    return moment().isBefore(this.getExpiration());
  }

  isExpired(){
    return !moment().isBefore(this.getExpiration());
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
    return this.getRole() === 'ROLE_OPERATOR' && this.isLoggedIn();
  }

  isAdmin(){
    return this.getRole() === 'ROLE_ADMIN' && this.isLoggedIn();
  }

  isOperatorOrAdmin(){
    const role = this.getRole();
    return ( role === 'ROLE_OPERATOR' || role === 'ROLE_ADMIN') && this.isLoggedIn();
  }
}
