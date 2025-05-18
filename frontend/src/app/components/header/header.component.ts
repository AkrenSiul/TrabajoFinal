import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { AuthService } from '../AuthService/AuthService';
import { ApiPanaderiaService } from '../../services/apiPanaderia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly testService = inject(ApiPanaderiaService);
  private readonly router = inject(Router);
  faCart = faCartShopping;
  login = false;
  esAdmin = false;

  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.authService.loginOn$.subscribe(isLogin => {
        this.login = isLogin;
      })
    );
    this.subscriptions.add(
      this.authService.isAdmin$.subscribe(isAdmin => {
        this.esAdmin = isAdmin;
      })
    );
    if (!this.login) {
      this.router.navigate(['/inicio']);
    }
  }

  logOut() {
    this.testService.logOut();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
