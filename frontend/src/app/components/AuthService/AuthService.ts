import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginOnSubject = new BehaviorSubject<boolean>(this.getLoginFromStorage());
  private isAdminSubject = new BehaviorSubject<boolean>(this.getAdminFromStorage());
  private isSuperAdminSubject = new BehaviorSubject<boolean>(this.getAdminFromStorage());

  loginOn$ = this.loginOnSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();
  isSuperAdmin$ = this.isSuperAdminSubject.asObservable();

  private getSuperAdminFromStorage() {
    const rol = localStorage.getItem('rol');
    return rol === 'superadmin';
}

  private getLoginFromStorage(): boolean {
    return localStorage.getItem('loginOn') === 'true';
  }

  private getAdminFromStorage(): boolean {
    const rol = localStorage.getItem('rol');
    return rol === 'admin' || rol === 'superadmin';
  }

  login(usuario: string, rol: string, email?: string) {
    localStorage.setItem('loginOn', 'true');
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('rol', rol);
    if (email) localStorage.setItem('email', email);

    this.loginOnSubject.next(true);
    this.isAdminSubject.next(this.getAdminFromStorage());
  }

  logout(): void {
    localStorage.removeItem('loginOn');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('email');

    this.loginOnSubject.next(false);
    this.isAdminSubject.next(false);
    this.isSuperAdminSubject.next(false);
  }

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    const rol = localStorage.getItem('rol');
    const email = localStorage.getItem('email');
    return { usuario, rol, email };
  }
}
