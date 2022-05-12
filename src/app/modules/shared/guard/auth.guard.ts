import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MsgCommunicationService } from '../services/msg-communication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private msgCommunicationService: MsgCommunicationService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authService.isLoggedIn())
      return true;
    else{
      this.msgCommunicationService.msgEvent.emit({msg: 'Please login!', status: 'danger', show: true});
      console.log(state.url);
      this.router.navigate(['/users/login'], { queryParams: { 'redirectURL': state.url } });
      return false;
    }
  }
  
}
