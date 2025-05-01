import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons/faCartShopping';
import {AuthService} from '../AuthService/AuthService';
import {TestServiceService} from '../../services/test-service.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public readonly authService: AuthService = inject(AuthService);
  private readonly testService: TestServiceService = inject(TestServiceService);
  faCart = faCartShopping;

  esAdmin = false;

  constructor() {
    console.log(this.esAdmin);
    if (this.authService.isLoggedIn()) {
      console.log('Usuario logueado:', this.authService.getUsuario());
    }    this.esAdmin = this.authService.isAdmin();
    if (this.authService.isLoggedIn()) {
      console.log('Usuario logueado:', this.authService.getUsuario());
    } else {
      console.log('No logueado');
    }
  }
  logOut() {
    this.testService.logOut();
    this.authService.logout();
  }


  ngOnInit() {


  }
}
