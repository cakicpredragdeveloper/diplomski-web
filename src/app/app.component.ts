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
    { title: 'Vehicles', url: '/vehicles', icon: 'paper-plane' },
    { title: 'Home', url: '/', icon: 'heart' }
  ];

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