import {Component, inject} from '@angular/core';
import {InterfaceProductos} from '../../common/productos';
import {CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';
import {ApiPanaderiaService} from '../../services/apiPanaderia.service';
import {AsyncPipe, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);
  private panaderiaService = inject(ApiPanaderiaService);
  productosCarrito$: Observable<InterfaceProductos[]>;
  cartSize$: Observable<number>;
  cartPrice$: Observable<number>;
  pedidoId = 1;

  constructor() {
    this.productosCarrito$ = this.cartService.cart$;
    this.cartSize$ = this.cartService.cartSize$;
    this.cartPrice$ = this.cartService.cartPrice$;
  }

  eliminarProducto(id: string) {
    this.cartService.removeProduct(id);
  }

  guardarPedido() {
    this.cartService.cart$.subscribe((productos) => {
      productos.forEach((producto) => {
        const detallePedido = {
          pedido_id: this.pedidoId,
          producto_id: producto.id,
          cantidad: producto.cantidad,
          precio_unidad: producto.precio
        };
        this.panaderiaService.postDetallePedidos(detallePedido).subscribe(
          (response) => {
            console.log('Detalle de pedido guardado correctamente', response);
          },
          (error) => {
            console.error('Error al guardar el detalle del pedido', error);
          }
        );
      });
    });
  }
  actualizarCantidad(id: string, cantidad: number) {
    const producto = this.cartService.getCart().find(p => p.id === id);
    if (producto) {
      producto.cantidad = cantidad;
      this.cartService.addProduct(producto);
    }
  }
}
