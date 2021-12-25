import { Component } from '@angular/core';
import {Vehicle} from '../../../_shared/model/Vehicle';
import {FormBuilder} from '@angular/forms';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage {


  loading = true;
  vehicles: Vehicle[] = undefined;
  paginationConfig = {
    pageIndex: 0,
    pageSize: 10,
    total: undefined
  };

  editorModal;


  constructor(private formBuilder: FormBuilder,
              private vehicleService: VehicleService) { }

  ionViewWillEnter() {
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

  fetchVehicles() {
    this.loading = true;
    this.vehicleService.index('',
      this.paginationConfig.pageIndex, this.paginationConfig.pageSize,
      'CreatedAt', 'DESC').subscribe(
      result => {
        this.vehicles = result.items;
        this.paginationConfig.total = result.total;
      },
      error => {
        // TODO (handle-me)
      },
      () => this.loading = false
    );
  }

  changePage(next: boolean) {
    this.paginationConfig.pageIndex = (next ? this.paginationConfig.pageIndex + 1 : this.paginationConfig.pageIndex - 1);
    this.fetchVehicles();
  }
}
