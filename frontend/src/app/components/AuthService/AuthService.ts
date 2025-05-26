import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartService} from '../../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cartService = inject(CartService)
  private loginOnSubject = new BehaviorSubject<boolean>(this.getLoginFromStorage());
  private isAdminSubject = new BehaviorSubject<boolean>(this.getAdminFromStorage());
  private isSuperAdminSubject = new BehaviorSubject<boolean>(this.getAdminFromStorage());

  loginOn$ = this.loginOnSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  private getLoginFromStorage(): boolean {
    return localStorage.getItem('loginOn') === 'true';
  }

  private getAdminFromStorage(): boolean {
    const rol = localStorage.getItem('rol');
    return rol === 'admin' || rol === 'superadmin';
  }

  login(usuario: string, rol: string, id: string,  email?: string) {
    localStorage.setItem('loginOn', 'true');
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('rol', rol);
    if (email) localStorage.setItem('email', email);
    localStorage.setItem('id', id)

    this.loginOnSubject.next(true);
    this.isAdminSubject.next(this.getAdminFromStorage());
  }

  logout(): void {
    localStorage.removeItem('loginOn');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.cartService.clearCart();

    this.loginOnSubject.next(false);
    this.isAdminSubject.next(false);
    this.isSuperAdminSubject.next(false);
  }

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    const rol = localStorage.getItem('rol');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');
    return { usuario, rol, email, id };
  }
}
