import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../_shared/model/Vehicle';

import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleTrackSearchParameters } from './../../../_shared/model/VehicleTrackSearchParameters';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
})
export class VehicleDetailPage implements OnInit {

  // From

  vehicleMilageForm: FormGroup;
  vahicleMilageFormActive = false;

  // Vehicle

  vehicle: Vehicle;
  loading = 0;

  // Chart

  public lineChartLegend = true;
  public lineChartType: ChartType = 'bar';
  public lineChartPlugins = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(22, 160, 133, 1)'
    }
  ];

  public lineChartColors1: Color[] = [{
  
      borderColor: 'black',
      backgroundColor: 'rgba(254, 121, 104, 1)'
  }];

  public lineChartLabels: Label[] = [];

  public lineChartLabels1: Label[] = [];

  public lineChartData: ChartDataSets[] = [
     { data: [], label: '' }
  ];

  public lineChartData1: ChartDataSets[] = [
    { data: [], label: '' }
 ];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private vehicleService: VehicleService,
              private formBuilder: FormBuilder,) {
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
        this.lineChartData[0].label  = `Kilometrage`;
        this.lineChartData1[0].label = `Fuel consumption in liters`;
        this.buildVehicleMilageForm(vehicleVin);
        this.fetchVehicle(vehicleVin);
      } else {
        //TODO: add toast
        this.router.navigate(['/vehicles']);
      }
    });
  }

  /**
   * Form-----------------------------------------------------------------------------------------------------------------------------------
   */


  buildVehicleMilageForm(vehicleVin: string): void {

    this.vehicleMilageForm = this.formBuilder.group({
      vin:           [vehicleVin, Validators.required],
      startDate:     [new Date().toISOString(), Validators.required],
      endDate:       [new Date().toISOString(), Validators.required],
      dateInterval:  ['3', Validators.required]
    });

    this.vahicleMilageFormActive = true;
  }

  /**
   * API Calls------------------------------------------------------------------------------------------------------------------------------
   */

  fetchVehicle(vehicleVin) {
    this.loading++;

    this.vehicleService.getByVin(vehicleVin).subscribe(
      result => {
        this.vehicle = result;
      },
      error => {
        // TODO (handle-me)
      },
      () => this.loading--
    );
  }

  fetchChartData() {

    const startDate = this.vehicleMilageForm.controls.startDate.value.toString().split('T');
    const endDate = this.vehicleMilageForm.controls.endDate.value.toString().split('T');
    
    this.vehicleService.getKilometrageByDate({
      vin: this.vehicleMilageForm.controls.vin.value,
      startDate: startDate[0],
      endDate: endDate[0],
      dateInterval: this.vehicleMilageForm.controls.dateInterval.value
    }as VehicleTrackSearchParameters).subscribe(
      response =>{
        
        this.lineChartData[0].data = [];
        this.lineChartLabels = [];

        this.lineChartData1[0].data = [];
        this.lineChartLabels1 = [];
       
        response.kilometrageByDate.forEach(kilometrage => {

            this.lineChartData[0].data.push(kilometrage.kilometrage);
            let date = kilometrage.date.toString().split('T');
            this.lineChartLabels.push(date[0]);
            this.lineChartLabels1.push(date[0]);

            this.lineChartData1[0].data.push(kilometrage.totalFuelUsed);

        });

      }
    );
  }

}
