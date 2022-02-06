import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';
import {Coordinate} from '../../../_shared/model/Coordinate';
import {FinderService} from '../../../finder/services/finder.service';
import {ToastService} from '../../../_shared/services/toast.service';
import {Circle} from '../../../finder/dtos/Circle';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehicle-finder',
  templateUrl: './vehicle-finder.page.html',
  styleUrls: ['./vehicle-finder.page.scss'],
})
export class VehicleFinderPage implements OnInit {

  vin: string;
  radius = 50;
  filter: FormGroup;
  filterActive = false;
  coordinates$: BehaviorSubject<Coordinate[]> = new BehaviorSubject([]);
  currentPosition$: Subject<Coordinate> = new Subject();

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private finderService: FinderService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.checkUrl();
    this.buildForm();
  }

  private checkUrl() {
    this.route.queryParamMap.subscribe(value => {

      this.vin = value.get('vehicleVin');
    });
  }

  getRadius(event: any) {
    this.radius = event.detail.value;
  }

  buildForm() {
    this.filter = this.formBuilder.group({
      radius: [50]
    });

    this.filterActive = true;
  }


  findWithinRadius(circle: Circle) {
    // this.coordinates$.next([
    //   {
    //     timestamp: new Date(),
    //     vin: '1',
    //     speed: 1,
    //     geoLocation: {
    //       latitude: circle.point.lat + Math.random() % (circle.radius / 2),
    //       longitude: circle.point.lng + Math.random() % (circle.radius / 2)
    //     },
    //     place: '',
    //     fuelLevel: 1,
    //     city: '',
    //     bateryVoltage: 1,
    //     direction: 1,
    //     manufacturerName: '',
    //     modelName: '',
    //   } as Coordinate
    // ]);


    this.finderService.vehiclesWithinRadius(circle).subscribe(
      result => {
        this.coordinates$.next(result);
      },
      error => {
        this.toastService.showError('Data could not be fetched');
      }
    );
  }

}
