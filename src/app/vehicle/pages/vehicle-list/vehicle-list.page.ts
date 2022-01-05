import { ManufacturerWithModels } from './../../../_shared/model/ManufacturerWithModels';
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

  vehicles: Vehicle[] = undefined;

  manufacturers: ManufacturerWithModels[] = undefined;
  manufaturerModels: string[] = undefined;

  loading = true;

  paginationConfig = {
    pageIndex: 0,
    pageSize: 10,
    total: undefined
  };

  filter: FormGroup;


  /**
   *  Lifecycle methods --------------------------------------------------------------------------------------------------------------------
   */

  constructor(private formBuilder: FormBuilder,
              private vehicleService: VehicleService) { }

  ionViewWillEnter() {
    this.buildFilter();
  }

  ionViewDidLeave() {

    this.loading = false;
    this.vehicles = undefined;
    this.manufacturers = undefined;
    this.manufaturerModels = undefined;

    this.paginationConfig = {
      pageIndex: 0,
      pageSize: 10,
      total: undefined
    };

    this.filter = undefined;
  }

  /**
   * API Calls -----------------------------------------------------------------------------------------------------------------------------
   */

  fetchVehicles() {

    this.vehicleService.index(this.filter.value,
      this.paginationConfig.pageIndex, this.paginationConfig.pageSize,
      'CreatedAt', 'DESC').subscribe(
      result => {
        this.vehicles = result.items;
        this.paginationConfig.total = result.total;

        this.fetchManufacturersWithModels();
      },
      error => {
        // TODO (handle-me)
      },
      () => this.loading = false
    );
  }


  fetchManufacturersWithModels() {
    this.vehicleService.manufaturesWithModels(this.filter.controls.manufacturer.value).subscribe(
      result =>{
          this.manufacturers = result;
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
        this.fetchVehicles();
      });

      this.fetchVehicles();
  }

  /**
   * Logic---------------------------------------------------------------------------------------------------------------------------------
   */

   onSelectManufacturer( chosenManufacturer ): void {

    const index = this.manufacturers.findIndex( manufacturer => manufacturer.manufacturer === chosenManufacturer.target.value);

    if(index === -1)
    {
      this.manufaturerModels = [];
      return;
    }

    this.manufaturerModels = this.manufacturers[index].models;
   }

  /**
   * Pagination----------------------------------------------------------------------------------------------------------------------------
   */

  changePage(next: boolean) {
    this.paginationConfig.pageIndex = (next ? this.paginationConfig.pageIndex + 1 : this.paginationConfig.pageIndex - 1);
    this.fetchVehicles();
  }

}
