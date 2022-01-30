import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class BaseApiService {

  public apiUrl: string;

  constructor(protected http: HttpClient,
              private router: Router)
  {
    this.apiUrl = environment.baseUrl;
  }

  public handleError(response: any) {
    if (response.status === 401) {
      this.handleAuthError(response);
    }

    return throwError(response);
  }


  public handleAuthError(response) {
    this.router.navigate(['/prijava']);
  }

  protected getQueryParams(filter: string,
                           pageIndex: number, pageSize: number,
                           orderBy: string = 'ID', direction: string = 'DESC'): HttpParams {

    let params = new HttpParams();

    params = (filter    ?   params.set('keyword',   filter)     : params);
    params = (pageIndex ?   params.set('pageIndex', JSON.stringify(pageIndex))  : params);
    params = (pageSize  ?   params.set('pageSize',  JSON.stringify(pageSize))   : params);
    params = (orderBy   ?   params.set('orderBy',   orderBy)                    : params);
    params = (direction ?   params.set('direction', direction)                  : params);
                          
    return params;
  }

}
