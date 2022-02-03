import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup } from '@angular/forms';
import { Circle } from '../../../finder/dtos/Circle';
import { Polygon } from '../../../finder/dtos/Polygon';
import { BehaviorSubject } from 'rxjs';
import { Coordinate } from '../../../_shared/model/Coordinate';
import { Point } from '../../../finder/dtos/Point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  private map;
  private polygonCoordinates = [];
  private lastPolygon = undefined;
  private lastCircle = undefined;
  private lastCoordinates = [];

  @Input() filter: FormGroup;
  @Input() coordinates$: BehaviorSubject<Coordinate[]>;
  @Output() findWithinRadius: EventEmitter<Circle> = new EventEmitter<Circle>();
  @Output() findWithinPolygon: EventEmitter<Polygon> = new EventEmitter<Polygon>();

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.subscribeToFilter();
    this.subscribeToCoordinates();
  }

  subscribeToFilter(): void {

    this.filter.controls.type.valueChanges.subscribe((data) => {
      this.removeOldCoordinates();
      if (data === 'polygon') {
        if (this.lastCircle !== undefined) {
          this.lastCircle.remove();
          this.lastCircle = undefined;
        }
      }
      else {
        if (this.lastPolygon !== undefined) {
          this.lastPolygon.remove();
          this.lastPolygon = undefined;
        }
        this.polygonCoordinates.forEach(coordinate => {
          coordinate.remove();
        });
        this.polygonCoordinates = [];
      }
    });

    this.filter.controls.radius.valueChanges.subscribe((radius) => {
      this.removeOldCoordinates();
      if (this.lastCircle !== undefined) {
        this.lastCircle.remove();
        this.lastCircle = L.circleMarker(this.lastCircle._latlng, {
          draggable: true,
          radius
        });
        this.findWithinRadius.emit({
          point: {
            lat: this.lastCircle._latlng.lat,
            lng: this.lastCircle._latlng.lng
          },
          radius
        });
        this.lastCircle.addTo(this.map);
      }
    });
  }

  private initMap(): void {
    this.map = this.createMap();

    this.addTileToMap();

    this.onMapClick();
  }

  private createMap() {
    return L.map('map', {
      center: [ 51.0756, 10.2509 ],
      zoom: 6
    });
  }

  private addTileToMap() {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private drawPolygon() {
    if (this.lastPolygon !== undefined) {
      this.lastPolygon.remove();
    }

    this.lastPolygon = L.polygon(this.polygonCoordinates.map(dot => dot._latlng));

    this.lastPolygon.addTo(this.map);
  }

  private onMapClick() {
    this.map.on('click', (data) => {

      switch (this.filter.controls.type.value) {
        case 'polygon':
          this.onMapClickForPolygon(data);
          break;
        case 'circle':
          this.onMapClickForCircle(data);
          break;
      }

    });
  }

  private onMarkerClick(marker) {
    return () => {
      this.polygonCoordinates = this.polygonCoordinates.filter(m => m._leaflet_id !== marker._leaflet_id);
      marker.remove();
      if (this.polygonCoordinates.length <= 2) {
        this.lastPolygon.remove();
        this.lastPolygon = undefined;
      }
      else {
        this.drawPolygon();
      }
    };
  }

  private onMarkerDrag(marker) {
    return () => {
      marker.setLatLng(marker.getLatLng(), { draggable: true }).update();
      this.drawPolygon();
    };
  }

  private addCoordinate(marker): void {
    this.removeOldCoordinates();
    this.polygonCoordinates.push(marker);
    if (this.polygonCoordinates.length > 2) {
      this.findWithinPolygon.emit({
        points: this.polygonCoordinates.map(m => {
          return {
            lat: m._latlng.lat,
            lng: m._latlng.lng,
          } as Point;
        })
      } as Polygon);
      this.drawPolygon();
    }
  }

  private onMapClickForPolygon(data) {
    const marker = L.marker(data.latlng, {
      draggable: true
    });

    marker.on('click', this.onMarkerClick(marker));

    marker.on('dragend', this.onMarkerDrag(marker));

    marker.addTo(this.map);

    this.addCoordinate(marker);
  }

  private onMapClickForCircle(data) {
    if (this.lastCircle !== undefined) {
      this.lastCircle.remove();
      this.lastCircle = undefined;
    }

    const marker = L.circleMarker(data.latlng, {
      draggable: true,
      radius: this.filter.controls.radius.value
    });
    this.lastCircle = marker;

    marker.addTo(this.map);

    this.findWithinRadius.emit({
      point: {
        lat: data.latlng.lat,
        lng: data.latlng.lng,
      },
      radius: this.filter.controls.radius.value
    });
  }

  private subscribeToCoordinates() {
    this.coordinates$.subscribe(coordinates => {

      this.removeOldCoordinates();

      coordinates.forEach(coordinate => {
        const marker = L.marker([coordinate.geoLocation.latitude, coordinate.geoLocation.longitude], {
          draggable: false
        });
        marker.addTo(this.map).bindPopup(
          `Lat: ${coordinate.geoLocation.latitude}, lng: ${coordinate.geoLocation.longitude}\n` +
          `Vin: ${coordinate.vin}\n` +
          `Fuel level: ${coordinate.fuelLevel}\n` +
          `Speed: ${coordinate.speed}km/h\n`
        );
        this.lastCoordinates.push(marker);
      });
    });
  }

  private removeOldCoordinates() {
    this.lastCoordinates.forEach(coordinate => {
      coordinate.remove();
    });
    this.lastCoordinates = [];
  }
}
