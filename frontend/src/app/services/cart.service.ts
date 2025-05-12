import { Injectable } from '@angular/core';
import {InterfaceProductos} from '../common/productos';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: InterfaceProductos[] = [];
  private cartSubject = new BehaviorSubject<InterfaceProductos[]>([]);
  private cartSizeSubject = new BehaviorSubject<number>(0);
  private cartPriceSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  cartSize$ = this.cartSizeSubject.asObservable();
  cartPrice$ = this.cartPriceSubject.asObservable();

  addProduct(producto: InterfaceProductos) {
    const index = this.cart.findIndex(p => p.id === producto.id);
    let carritoTotal = this.cartPriceSubject.value;
    let carritoSize = this.cartSizeSubject.value;
    if (index !== -1) {
      this.cart[index].cantidad! += producto.cantidad || 1;
    } else {
      this.cart.push({ ...producto });
    }
    this.cartSubject.next(this.cart);
    carritoTotal += producto.precio * (producto.cantidad || 1);
    this.cartPriceSubject.next(carritoTotal);
    carritoSize = this.cart.length;
    this.cartSizeSubject.next(carritoSize);
  }

  getCart(): InterfaceProductos[] {
    return [...this.cart];
  }
  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
    this.cartSizeSubject.next(0);
    this.cartPriceSubject.next(0);
  }

  removeProduct(id: string): void {
    const productToRemove = this.cart.find(p => p.id === id);
    let carritoTotal = this.cartPriceSubject.value;
    let carritoSize = this.cartSizeSubject.value;

    if (productToRemove) {
      carritoTotal -= productToRemove.precio * (productToRemove.cantidad || 1);
      this.cart = this.cart.filter(p => p.id !== id);
      this.cartSubject.next(this.cart);
      carritoSize = this.cart.length;
      this.cartSizeSubject.next(carritoSize);
      this.cartPriceSubject.next(carritoTotal);
    }
  }
}
