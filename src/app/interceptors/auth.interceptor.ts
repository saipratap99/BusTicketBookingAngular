import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = localStorage.getItem('token');
        if(token){
            const cloned = req.clone({
                headers: req.headers.set('Authorization', token),
                withCredentials: true
            })
            return next.handle(cloned);
        }else{
            const cloned = req.clone({
                withCredentials: true
            })
            return next.handle(cloned);
        }
    }
    
}