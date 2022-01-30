import { Injectable } from '@angular/core';
import {BaseApiService} from '../../_shared/services/base-api.service';
import {Vehicle} from '../../_shared/model/Vehicle';
import {catchError} from 'rxjs/operators';
import {PaginationResponse} from '../../_shared/model/PaginationResponse';
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { VehiclePaginationParameters } from 'src/app/_shared/model/VehiclePaginationParameters';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseApiService {

  public index(vehicle: VehiclePaginationParameters, pageIndex: number, pageSize: number,
   ): Observable<PaginationResponse<Vehicle>> {

    let params = new HttpParams();

    params = (vehicle.manufacturerName.length>0 ?   params.set('manufacturerName', vehicle.manufacturerName)  : params);
    params = (vehicle.modelName.length>0 ?   params.set('modelName', vehicle.modelName)  : params);
    params = (vehicle.engineFuel.length>0 ?   params.set('engineFuel', vehicle.engineFuel)  : params);
    params = (vehicle.drivetrain.length>0 ?   params.set('drivetrain',vehicle.drivetrain)  : params);
    params = (vehicle.yearFrom.length>0 ?   params.set('yearFrom', vehicle.yearFrom)  : params);
    params = (vehicle.yearTo.length>0 ?   params.set('yearTo', vehicle.yearTo)  : params);
    params = (vehicle.odometerFrom.length>0 ?   params.set('odometerFrom', vehicle.odometerFrom)  : params);
    params = (vehicle.odometerTo.length>0 ?   params.set('odometerTo', vehicle.odometerTo)  : params);
    params = (pageIndex ?   params.set('pageIndex', JSON.stringify(pageIndex))  : params);
    params = (pageSize ?   params.set('pageSize', JSON.stringify(pageSize))  : params);
                        

    return this.http.get<PaginationResponse<Vehicle>>(this.apiUrl + '/api/vehicles', { params })
      .pipe(catchError(response => this.handleError(response)));
  }

  public show(vehicleVin: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.apiUrl + `/api/vehicles/${vehicleVin}`)
      .pipe(catchError(response => this.handleError(response)));
  }

  public getByVin(vehicleVin: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.apiUrl + `/api/vehicles/get-by-vin?vin=${vehicleVin}`)
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

  public filters(): Observable<any> {
    return this.http.get(this.apiUrl+ '/api/vehicles/filters')
      .pipe(catchError(response => this.handleError(response)));
  }

  public manufaturesWithModels(vahicleManufacturer: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/vehicles/get-manufacturers-and-models`)
    .pipe(catchError(response => this.handleError(response)));
  }
}
