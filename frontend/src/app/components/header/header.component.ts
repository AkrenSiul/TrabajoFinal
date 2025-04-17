import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons/faCartShopping';

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
export class HeaderComponent {
  login: boolean = false;
  faCart = faCartShopping;

}
