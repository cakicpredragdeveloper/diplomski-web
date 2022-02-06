import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from './auth/store/auth.actions';
import { State } from './_shared/store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  showMenu = false;

  public appPages = [
    { title: 'Vehicles', url: '/vehicles', icon: 'car-sport' },
    { title: 'Finder', url: '/finder', icon: 'car-sport' },
    { title: 'Visualization', url: '/vehicle-track-visualisation', icon: 'map' },
    { title: 'Monitoring', url: '/vehicle-monitoring', icon: 'tv' },

  ];
    // { title: 'Home', url: '/', icon: 'home' }
  constructor(private router: Router,
              private store: Store<State>) {}

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

  logout() {
    this.store.dispatch(logout());
  }
}
