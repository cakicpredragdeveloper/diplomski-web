import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FinderService } from '../../services/finder.service';
import { Circle } from '../../dtos/Circle';
import { ToastService } from '../../../_shared/services/toast.service';
import { Polygon } from '../../dtos/Polygon';
import { BehaviorSubject } from 'rxjs';
import { Coordinate } from '../../../_shared/model/Coordinate';
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

@Component({
  selector: 'app-finder',
  templateUrl: './finder.page.html',
  styleUrls: ['./finder.page.scss'],
})
export class FinderPage implements OnInit {

  radius = 50;
  filter: FormGroup;
  filterActive = false;
  coordinates$: BehaviorSubject<Coordinate[]> = new BehaviorSubject([]);

  constructor(private formBuilder: FormBuilder,
              private finderService: FinderService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.buildForm();
  }

  getRadius(event: any) {
    this.radius = event.detail.value;
  }

  buildForm() {
    this.filter = this.formBuilder.group({
      type: ['circle'],
      radius: [50]
    });

    this.filterActive = true;
  }

  findWithinRadius(circle: Circle) {
    /*this.coordinates$.next([
      {
        timestamp: new Date(),
        vin: '1',
        speed: 1,
        geoLocation: {
          latitude: circle.point.lat + Math.random() % (circle.radius / 2),
          longitude: circle.point.lng + Math.random() % (circle.radius / 2)
        },
        place: '',
        fuelLevel: 1,
        city: '',
        bateryVoltage: 1,
        direction: 1,
        manufacturerName: '',
        modelName: '',
      } as Coordinate
    ]);*/
    this.finderService.vehiclesWithinRadius(circle).subscribe(
      result => {
        this.coordinates$.next(result);
      },
      error => {
        this.toastService.showError('Data could not be fetched');
      }
    );
  }

  findWithinPolygon(polygon: Polygon) {
    console.log(polygon);
    this.finderService.vehiclesWithinPolygon(polygon).subscribe(
      result => {
        this.coordinates$.next(result);
      },
      error => {
        this.toastService.showError('Data could not be fetched');
      }
    );
  }

}
