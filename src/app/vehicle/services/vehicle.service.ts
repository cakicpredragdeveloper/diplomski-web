import { Injectable } from '@angular/core';
import {BaseApiService} from '../../_shared/services/base-api.service';
import {Vehicle} from '../../_shared/model/Vehicle';
import {catchError} from 'rxjs/operators';
import {PaginationResponse} from '../../_shared/model/PaginationResponse';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseApiService {

  public index(filter: string, pageIndex: number, pageSize: number, orderBy: string = 'ID', direction: string = 'DESC'): Observable<PaginationResponse<Vehicle>> {

    const params = this.getQueryParams(filter, pageIndex, pageSize, orderBy, direction);

    return this.http.get<PaginationResponse<Vehicle>>(this.apiUrl + '/api/vehicles', { params })
      .pipe(catchError(response => this.handleError(response)));
  }

  public show(vehicleVin: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.apiUrl + `/api/vehicles/${vehicleVin}`)
      .pipe(catchError(response => this.handleError(response)));
  }

  public store(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl + '/api/vehicles', vehicle)
      .pipe(catchError(response => this.handleError(response)));
  }

  public update(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(this.apiUrl + `/api/vehicles/${vehicle.vin}`, vehicle)
      .pipe(catchError(response => this.handleError(response)));
  }

  public destroy(vehicleVin: number): Observable<any> {

    return this.http.delete(this.apiUrl + `/api/vehicles/${vehicleVin}`)
      .pipe(catchError(response => this.handleError(response)));
  }
}
