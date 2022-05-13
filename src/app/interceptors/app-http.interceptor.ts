import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { AuthService } from "../modules/shared/services/auth.service";
import { MsgCommunicationService } from "../modules/shared/services/msg-communication.service";
import { globalVars } from "../modules/shared/models/urls.model";

@Injectable({
    providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor{

    constructor(private msgCommunicationService: MsgCommunicationService, private authService: AuthService, private http: HttpClient){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(evt => {
                if(evt instanceof HttpResponse){
                    const token = evt.headers.get('Authorization');
                    if(localStorage.getItem('token') !== token){
                        if(token != null)
                            this.authService.setAccessToken(token);
                    }
                    
                }
            }),
            catchError(err => {
                if(err instanceof HttpErrorResponse){
                    console.log(err)
                    if(err.status == 0)
                        this.msgCommunicationService.msgEvent.emit({msg: 'Unable to connect!', status: 'danger', show: true });
                    else if(err.status == 401){
                        console.log("401")
                        this.authService.clearSession();
                        this.msgCommunicationService.msgEvent.emit({msg: 'Please login!', status: 'danger', show: true });
                    }else if(err.status == 400)
                        this.msgCommunicationService.msgEvent.emit({msg: err?.error?.msg, status: 'danger', show: true });
                    else
                        this.msgCommunicationService.msgEvent.emit({msg: 'Something went wrong!', status: 'danger', show: true });
                }
                return of(err)
            })
        );
        
    }
    
}