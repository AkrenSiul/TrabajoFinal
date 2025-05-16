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

      if (index !== -1) {
        this.cart[index].cantidad = producto.cantidad!;
      } else {
        this.cart.push({ ...producto });
      }

      this.cartSubject.next(this.cart);

      const total = this.cart.reduce((sum, p) => sum + p.precio * (p.cantidad || 1), 0);
      const size = this.cart.length;

      this.cartPriceSubject.next(total);
      this.cartSizeSubject.next(size);
    }

  getCart(): InterfaceProductos[] {
    return [...this.cart];
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
  clearCart(): void {
    this.cart = [];
    this.cartSubject.next([]);
    this.cartSizeSubject.next(0);
    this.cartPriceSubject.next(0);
  }
}
