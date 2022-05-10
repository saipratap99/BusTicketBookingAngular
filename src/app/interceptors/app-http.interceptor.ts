import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { AuthService } from "../modules/shared/services/auth.service";
import { MsgCommunicationService } from "../modules/shared/services/msg-communication.service";

@Injectable({
    providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor{

    constructor(private msgCommunicationService: MsgCommunicationService, private authService: AuthService, private http: HttpClient){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log("is expired: ", localStorage.getItem('token') != null && this.authService.isExpired())
        if(localStorage.getItem('token') != null && this.authService.isExpired())
            this.refreshAccessToken();
    
        console.log("http interceptor")

        return next.handle(req).pipe(
            tap(evt => {
                if(evt instanceof HttpResponse){
                    if(evt.body && evt.body.success){}
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

    refreshAccessToken(){
        console.log("refresh", localStorage.getItem('refreshToken'))
        this.http.post(`http://localhost:8080/api/v1/users/auth/refresh-token/${localStorage.getItem('refreshToken')}`, { refreshToken: localStorage.getItem('refreshToken') })
            .subscribe({
                next: (data) => {
                    console.log(data);
                    this.authService.setSession(JSON.parse(JSON.stringify(data)).accessToken, JSON.parse(JSON.stringify(data)).refreshToken);
                }
            })
    }
    
}