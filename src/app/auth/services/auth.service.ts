import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../_shared/services/base-api.service';

import { Register } from './../../_shared/model/Register';
import { Token } from './../../_shared/model/Token';
import { Login } from './../../_shared/model/Login';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseApiService {

    register(register: Register): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/register`, register);
    };

    login(login: Login): Observable<Token>{
        return this.http.post<Token>(`${this.apiUrl}/api/login`, login);
    };

    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/logout`, {});
    };

    isLoggedIn(): Observable<any> {

      return this.http.get(`${this.apiUrl}/api/current-user`);
    }

    revokeToken(token: Token, accessToken: string): Observable<Token>{
        return this.http.post<Token>(`${this.apiUrl}/api/revoke-token`,
            token,
            {headers:
                new HttpHeaders({'Expired-token' : `Bearer ${accessToken}`})
            });
    };
}
