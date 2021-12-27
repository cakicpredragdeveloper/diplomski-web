import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { VehicleService } from '../../services/vehicle.service';

import { VehicleFilter } from './../../../_shared/model/VehicleFilter';
import { Vehicle } from '../../../_shared/model/Vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage {


  loading = true;


  vehicles: Vehicle[] = undefined;
  vehicleFilter: VehicleFilter = undefined;

  paginationConfig = {
    pageIndex: 0,
    pageSize: 10,
    total: undefined
  };

  filter: FormGroup;


  /**
   * TODO: Remove this when api is implemented--------------------------------------------------------------------------------------------
   */

  hardCodedVehicles: Vehicle[] = [
    {
      vin: '123',
      manufacturerName: 'Volkswagen',
      modelName: 'Golf 4',
      transmission: 'Manual',
      color: 'black',
      odometerValue: 3,
      yearProduced: 2001,
      engineFuel: 'Diesel',
      engineHasGas: true,
      engineCapacity: 1900,
      bodyType: 'Hatchbak',
      drivetrain: '?',
      priceEur: 2000
    },
    {
      vin: '333',
      manufacturerName: 'Volkswagen',
      modelName: 'Golf 5',
      transmission: 'Manual',
      color: 'blue',
      odometerValue: 3,
      yearProduced: 2004,
      engineFuel: 'Diesel',
      engineHasGas: true,
      engineCapacity: 2000,
      bodyType: 'Hatchbak',
      drivetrain: '?',
      priceEur: 2900
    },
    {
      vin: '333',
      manufacturerName: 'Mercedes-benz',
      modelName: 'C220',
      transmission: 'Automatic',
      color: 'blue',
      odometerValue: 3,
      yearProduced: 2001,
      engineFuel: 'Diesel',
      engineHasGas: true,
      engineCapacity: 2143,
      bodyType: 'Limusine',
      drivetrain: '?',
      priceEur: 5000
    },
    {
      vin: '444',
      manufacturerName: 'Volkswagen',
      modelName: 'Passat B5.5',
      transmission: 'Manual',
      color: 'black',
      odometerValue: 3,
      yearProduced: 2001,
      engineFuel: 'Diesel',
      engineHasGas: true,
      engineCapacity: 1900,
      bodyType: 'Limusine',
      drivetrain: '?',
      priceEur: 500
    }
  ];


  /**
   *  Lifecycle methods --------------------------------------------------------------------------------------------------------------------
   */

  constructor(private formBuilder: FormBuilder,
              private vehicleService: VehicleService) { }

  ionViewWillEnter() {
    this.buildFilter();
    this.fetchVehicles();
  }

  ionViewDidLeave() {
    this.loading = false;
    this.vehicles = undefined;
    this.paginationConfig = {
      pageIndex: 0,
      pageSize: 10,
      total: undefined
    };
  }

  /**
   * API Calls -----------------------------------------------------------------------------------------------------------------------------
   */

  fetchVehicles() {

     //TODO: Remove this when api is implemented and uncomment code bellow
     this.vehicles = this.hardCodedVehicles;
     this.paginationConfig.total = 4;
     this.loading=false;
     this.fetchFilters();

    // this.vehicleService.index('',
    //   this.paginationConfig.pageIndex, this.paginationConfig.pageSize,
    //   'CreatedAt', 'DESC').subscribe(
    //   result => {
    //     this.vehicles = result.items;
    //     this.paginationConfig.total = result.total;
    //     this.fetchFilters();



    //   },
    //   error => {
    //     // TODO (handle-me)
    //   },
    //   () => this.loading = false
    // );
  }

  fetchFilters() {

    this.vehicleService.filters().subscribe(
      result =>{
        this.vehicleFilter = result;
      },
      error =>{
        //TODO (handle-me)
      }
    );

  }

  fetchModels() {
    this.vehicleService.models(this.filter.controls.manufacturer.value).subscribe(
      result =>{
        this.vehicleFilter.models = result;
      },
      error =>{
        //TODO (handle-me)
      }
    );
  }

  /**
   * FORM-----------------------------------------------------------------------------------------------------------------------------------
   */

  buildFilter() {

    this.filter = this.formBuilder.group({
      name: [''],
      manufacturer: [''],
      model:[''],
      fuelType:[''],
      drivetrain:[''],
      yearFrom:[''],
      yearTo:[''],
      mileageFrom:[''],
      mileageTo:['']
    });

    this.filter.valueChanges
      .pipe(
        debounceTime(350),
        distinctUntilChanged())
      .subscribe(value => {
        this.paginationConfig.pageIndex = 0;
        this.fetchModels();
        this.fetchVehicles();
      });
  }

  /**
   * Pagination----------------------------------------------------------------------------------------------------------------------------
   */

  changePage(next: boolean) {
    this.paginationConfig.pageIndex = (next ? this.paginationConfig.pageIndex + 1 : this.paginationConfig.pageIndex - 1);
    this.fetchVehicles();
  }



}
