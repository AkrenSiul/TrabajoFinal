import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    return localStorage.getItem('loginOn') === 'true';
  }

 isAdmin(): boolean {
    return localStorage.getItem('rol') === 'superadmin'  || localStorage.getItem('rol') === 'admin';
 }

  logout(): void {
    localStorage.removeItem('loginOn');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
  }

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    const rol = localStorage.getItem('rol');
    return {usuario, rol};

  }
}
