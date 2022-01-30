import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  showMenu = false;

  public appPages = [
    { title: 'Login', url: '/login', icon: 'mail' },
    { title: 'Register', url: '/register', icon: 'paper-plane' },
    { title: 'Vehicles', url: '/vehicles', icon: 'car-sport' },
    { title: 'Visualization', url: '/vehicles/vehicle-track-visualisation', icon: 'map' },

  ];
    // { title: 'Home', url: '/', icon: 'home' }
  constructor(private router: Router) {}

  ngOnInit() {
    this.showSideMenu();
  }

  showSideMenu() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !(this.router.url === '/login' || this.router.url === '/register');
      }
    });
  }
}
