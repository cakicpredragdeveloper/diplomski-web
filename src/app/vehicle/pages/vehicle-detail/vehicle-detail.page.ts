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

  fetchVehicle(vehicleVin) {
    this.loading++;
    this.vehicleService.show(vehicleVin).subscribe(
      result => {
        this.vehicle = result;
      },
      error => {
        // TODO (handle-me)
      },
      () => this.loading--
    );
  }
}
