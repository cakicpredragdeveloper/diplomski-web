import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../_shared/model/Vehicle';

import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
})
export class VehicleDetailPage implements OnInit {


  vehicle: Vehicle;
  loading = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private vehicleService: VehicleService) {
  }

  /**
   * Lifecycle methods--------------------------------------------------------------------------------------------------------------------
   */

  ngOnInit() {
    this.initializeComponent();
  }

  initializeComponent(): void {

    this.route.paramMap.subscribe(params => {
      if (params.has('vehicleVin')) {
        const vehicleVin = params.get('vehicleVin');
        this.fetchVehicle(vehicleVin);
      } else {
        // add toast nije moguce pronaci magacin
        this.router.navigate(['/vehicles']);
      }
    });
  }

  /**
   * API Calls------------------------------------------------------------------------------------------------------------------------------
   */

  fetchVehicle(vehicleVin) {
    this.loading++;

    //TODO: Delete this and uncomment code bellow when api is implemented

    this.vehicle = {vin: '123',
    manufacturerName: 'Volkswagen',
    modelName: 'Golf 4',
    transmission: 'Manual',
    color: 'black',
    odometerValue: 3,
    yearProduced: 2001,
    engineFuel: 'Diesel',
    engineHasGas: true,
    engineCapacity: 1900,
    bodyType: 'Hatchback',
    drivetrain: '4x4',
    priceEur: 2000} as Vehicle;
    this.loading--;

    // this.vehicleService.show(vehicleVin).subscribe(
    //   result => {
    //     this.vehicle = result;
    //   },
    //   error => {
    //     // TODO (handle-me)
    //   },
    //   () => this.loading--
    // );
  }
}
