import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppHttpInterceptor } from "./app-http.interceptor";
import { AuthInterceptor } from "./auth.interceptor";


export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
];