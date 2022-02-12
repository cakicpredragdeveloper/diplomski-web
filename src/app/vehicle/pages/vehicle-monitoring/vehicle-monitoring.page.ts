import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { ManufacturerWithModels } from 'src/app/_shared/model/ManufacturerWithModels';
import { MarksModelTrackSearchParameters } from 'src/app/_shared/model/MarksModelTrackSearchParameters';

@Component({
  selector: 'app-vehicle-monitoring',
  templateUrl: './vehicle-monitoring.page.html',
  styleUrls: ['./vehicle-monitoring.page.scss'],
})
export class VehicleMonitoringPage implements OnInit {

    // From

    vehicleForm: FormGroup;
    vahicleFormActive = false;

    // Manufacturers and Models

    manufacturers: ManufacturerWithModels[] = undefined;
    manufaturerModels: string[] = undefined;

    loading = true;
    isManufacturerSelected = false;

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
      },
    ];

    public lineChartLabels: Label[] = [];

    public lineChartData: ChartDataSets[] = [
      { data: [], label: '' },
    ];


    constructor(private vehicleService: VehicleService,
                private formBuilder: FormBuilder,) {
    }

  /**
   * Lifecycle methods--------------------------------------------------------------------------------------------------------------------
   */

    ngOnInit() {
      this.initializeComponent();

    }

    initializeComponent(): void {
      this.buildVehicleForm();
    }

  /**
   * Form-----------------------------------------------------------------------------------------------------------------------------------
   */

    buildVehicleForm(): void {

      this.vehicleForm = this.formBuilder.group({

        startDate:        [new Date().toISOString(), Validators.required],
        endDate:          [new Date().toISOString(), Validators.required],
        dateInterval:     ['3', Validators.required],
        manufacturerName: [null, Validators.required],
        modelName:        [null]
      });

      this.vahicleFormActive = true;


      this.fetchManufacturersWithModels();
    }

  /**
   * API Calls------------------------------------------------------------------------------------------------------------------------------
   */

    fetchManufacturersWithModels() {
      this.vehicleService.manufaturesWithModels( this.vehicleForm.controls.manufacturerName.value ).subscribe(
        result =>{
            this.manufacturers = result;
        },
        error =>{
          //TODO (handle-me)
        }
      );
    }

    fetchChartData() {

      const startDate = this.vehicleForm.controls.startDate.value.toString().split('T');
      const endDate = this.vehicleForm.controls.endDate.value.toString().split('T');


      this.vehicleService.getKilometrageByDateAndManufacturer( {
        startDate: startDate[0],
        endDate: endDate[0],
        dateInterval: this.vehicleForm.controls.dateInterval.value,
        manufacturerName: this.vehicleForm.controls.manufacturerName.value,
        modelName: this.vehicleForm.controls.modelName.value
      } as MarksModelTrackSearchParameters ).subscribe(
        response =>{

        this.lineChartData[0].data = [];
        this.lineChartLabels = [];
        
        response.kilometrageByDate.forEach(kilometrage => {

            this.lineChartData[0].data.push(kilometrage.kilometrage);
            let date = kilometrage.date.toString().split('T');
            this.lineChartLabels.push(date[0]);
        });

          this.lineChartData[0].label = this.vehicleForm.controls.manufacturerName.value + ' ' + this.vehicleForm.controls.modelName.value;
        }
      );
    }

  /**
   * Logic---------------------------------------------------------------------------------------------------------------------------------
   */

    onSelectManufacturer( chosenManufacturer ): void {

      const index = this.manufacturers.findIndex( manufacturer => manufacturer.manufacturer === chosenManufacturer.target.value );

      if(index === -1){

        this.manufaturerModels = [];
        return;
      }

      this.isManufacturerSelected = true;

      this.manufaturerModels = this.manufacturers[index].models;
      this.vehicleForm.controls.manufacturerName.setValue(this.manufacturers[index].manufacturer);
      this.vehicleForm.controls.manufacturerName.updateValueAndValidity();

      this.vehicleForm.controls.modelName.setValue('');
      this.vehicleForm.controls.modelName.updateValueAndValidity();
    }

      resetSelected(){
        this.vehicleForm.controls.manufacturerName.setValue('');
        this.vehicleForm.controls.manufacturerName.updateValueAndValidity();
        this.isManufacturerSelected = false;
        this.vehicleForm.controls.modelName.setValue('');
        this.vehicleForm.controls.modelName.updateValueAndValidity();
    }
}
