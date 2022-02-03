import { Injectable } from '@angular/core';
import { BaseApiService } from '../../_shared/services/base-api.service';
import { Circle } from '../dtos/Circle';
import { HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Polygon } from '../dtos/Polygon';
import { Coordinate } from '../../_shared/model/Coordinate';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinderService extends BaseApiService {


  public vehiclesWithinRadius(circle: Circle) {

    let params = new HttpParams();
    params = (circle.point.lat ? params.set('lat',      JSON.stringify(circle.point.lat))    : params);
    params = (circle.point.lng ? params.set('lng',      JSON.stringify(circle.point.lng))    : params);
    params = (circle.radius    ? params.set('distance', JSON.stringify(circle.radius))       : params);

    return this.http.get<Coordinate[]>(this.apiUrl + '/vehicles-with-geo-distance-from-point', {params})
      .pipe(catchError(response => this.handleError(response)));
  }


  public vehiclesWithinPolygon(polygon: Polygon) {

    return this.http.post<Coordinate[]>(this.apiUrl + '/vehicles-within-polygon', polygon.points)
      .pipe(catchError(response => this.handleError(response)));
  }

  public currentPosition(vin: string): Observable<Coordinate> {

    let params = new HttpParams();
    params = (vin ? params.set('vin',      vin)    : params);

    return this.http.get<Coordinate>(this.apiUrl + '/current-position', {params})
      .pipe(catchError(response => this.handleError(response)));
  }
}
