import { environment } from '../../../environments/environment';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, } from "rxjs";
import { Token } from '../model/Token';

import { AuthService } from '../../auth/services/auth.service';
import { JwtTokenService } from "../services/jwt-token.service";
import { catchError, filter, switchMap, take } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})

export class TokenInterceptor implements HttpInterceptor{

    private tokenRefreshing                             = false;
    private refreshTokenSubject: BehaviorSubject<Token> = new BehaviorSubject<Token>(null!);

    constructor(
        private authService:    AuthService,
        private jwTokenService: JwtTokenService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addToken(req))
            .pipe(

                catchError(error =>{
                    if(error instanceof HttpErrorResponse
                       && error.status ===401
                       && error.url === `${environment.baseUrl}/api/revoke-token`){
                           localStorage.clear();

                       }

                    if(error instanceof HttpErrorResponse && error.status === 401){
                        return this.handle401Error(req, next);
                    }
                    return throwError(error);
                })
            )
    };

    private addToken(request: HttpRequest<any>)
    {

        const expiration = new Date(JSON.parse(localStorage.getItem('expiration')!)*1e3);

        if(expiration && +expiration - +new Date() > 0) {

            return request.clone({
                setHeaders: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
        }

        return request;
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler){
        if(this.tokenRefreshing){
            return this.refreshTokenSubject
                .pipe(
                    filter(token => token!= null),
                    take(1),
                    switchMap(()=>{
                        return next.handle(this.addToken(request))
                    })
                )
        }
        else{
            this.tokenRefreshing = true;

            this.refreshTokenSubject.next(null!);

            const token        = new Token();
            const accessToken  = localStorage.getItem('accessToken');
            token.refreshToken = localStorage.getItem('refreshToken')!;

            return this.authService.revokeToken(token,accessToken!)
                .pipe(
                    switchMap( result => {
                        this.tokenRefreshing = false;
                        this.refreshTokenSubject.next(result);
                        localStorage.setItem('accessToken', result.accessToken!);
                        localStorage.setItem('refreshToken', result.refreshToken!);
                        localStorage.setItem('expiration', JSON.stringify(result.expiration));
                        localStorage.setItem('role', this.jwTokenService.getRoleFromToken(result.accessToken!));

                        return next.handle(this.addToken(request));
                    })
                )
        }
    }

}
