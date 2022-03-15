import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as L from 'leaflet';
import {FormGroup} from '@angular/forms';
import {Circle} from '../../../finder/dtos/Circle';
import {BehaviorSubject, Subject} from 'rxjs';
import {Coordinate} from '../../../_shared/model/Coordinate';
import {Point} from "../../../finder/dtos/Point";
import {FinderService} from "../../../finder/services/finder.service";

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.scss'],
})
export class VehicleMapComponent implements AfterViewInit {

  redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  private map;
  private lastCircle = undefined;
  private lastCoordinates = [];

  @Input() filter: FormGroup;
  @Input() coordinates$: BehaviorSubject<Coordinate[]>;
  @Input() vin: string;
  @Output() findWithinRadius: EventEmitter<Circle> = new EventEmitter<Circle>();

  constructor(private finderService: FinderService) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.subscribeToFilter();
    this.subscribeToCoordinates();
    this.getCurrentPosition();
  }

  getCurrentPosition(): void {
    this.finderService.currentPosition(this.vin).subscribe(result => {
      this.setPosition(result);

      this.findWithinRadius.emit({
        point: {
          lat: result.geoLocation.latitude,
          lng: result.geoLocation.longitude,
        } as Point,
        radius: this.filter.controls.radius.value
      } as Circle);
    });
  }

  subscribeToFilter(): void {

    this.filter.controls.radius.valueChanges.subscribe((radius) => {
      this.removeOldCoordinates();
      if (this.lastCircle !== undefined) {
        this.lastCircle.remove();
        this.lastCircle = L.circleMarker(this.lastCircle._latlng, {
          draggable: true,
          radius: this.filter.controls.radius.value * this.num(10 - this.map.getZoom())
        });
        this.findWithinRadius.emit({
          point: {
            lat: this.lastCircle._latlng.lat,
            lng: this.lastCircle._latlng.lng
          },
          radius: this.filter.controls.radius.value
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
      center: [51.0756, 10.2509],
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

  private onMapClick() {
    // this.map.on('click', (data) => {
    //   this.onMapClickForCircle(data);
    // });
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
      radius: this.filter.controls.radius.value * this.num(10 - this.map.getZoom())
    });
  }

  private subscribeToCoordinates() {
    this.coordinates$.subscribe(coordinates => {

      this.removeOldCoordinates();

      coordinates.forEach(coordinate => {
        const marker = L.marker([coordinate.geoLocation.latitude, coordinate.geoLocation.longitude], {
          icon: this.redIcon,
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

  private setPosition(position: Coordinate) {
    const marker = L.circleMarker([position.geoLocation.latitude, position.geoLocation.longitude], {
      radius: this.filter.controls.radius.value * this.num(10 - this.map.getZoom())
    });
    this.lastCircle = marker;

    marker.addTo(this.map);
  }

  private num(val) {
    let res = 10;
    let g = Math.abs(val);
    for (let i = 0; i < g; i++) {
      if (val < 0) {
        res *=2;
      }
      else {
        res /=2;
      }
    }
    return res;
  }
}

