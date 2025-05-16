import {Component, inject} from '@angular/core';
import {InterfaceProductos} from '../../common/productos';
import {CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';
import {ApiPanaderiaService} from '../../services/apiPanaderia.service';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {AuthService} from '../AuthService/AuthService';

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
  private readonly authService = inject(AuthService);
  productosCarrito$: Observable<InterfaceProductos[]>;
  cartSize$: Observable<number>;
  cartPrice$: Observable<number>;
  idUser!: string;
  pedidoId = 1;

  constructor() {
    this.productosCarrito$ = this.cartService.cart$;
    this.cartSize$ = this.cartService.cartSize$;
    this.cartPrice$ = this.cartService.cartPrice$;
    const user = this.authService.getUsuario();
    if(user.id) {
      this.idUser = user.id;
    }
  }
  getStockDisponible(producto: InterfaceProductos): number {
    const enCarrito = producto.cantidad || 0;
    return producto.stock - enCarrito;
  }

  eliminarProducto(id: string) {
    this.cartService.removeProduct(id);
  }

  guardarPedido() {
    this.cartService.cart$.subscribe((productos) => {
      if (!productos || productos.length === 0) {
        return
      }
      let total = 0;
      productos.forEach(producto => {
        total += (producto.precio * (producto.cantidad || 1));
      });

      const pedidoData = {
        usuario_id: this.idUser,
        fecha_pedido: new Date().toISOString().split('T')[0],
        estado: 'pendiente',
        total: total
      };

      this.panaderiaService.createPedido(pedidoData).subscribe({
        next: (pedidoCreado) => {
          console.log('Pedido creado:', pedidoCreado);
          this.pedidoId = pedidoCreado.pedido.id;

          productos.forEach(producto => {
            const detallePedido = {
              pedido_id: this.pedidoId,
              producto_id: producto.id,
              cantidad: producto.cantidad,
              precio_unidad: producto.precio
            };

            this.panaderiaService.postDetallePedidos(detallePedido).subscribe(
              response => console.log('Detalle guardado:', response),
              error => console.error('Error al guardar detalle:', error)
            );
            this.cartService.clearCart();
          });
        },
        error: (err) => {
          console.error('Error al crear el pedido:', err);
        }
      });
    });
  }

  actualizarCantidad(id: string, cantidad: number) {
    if (cantidad < 1) {
      this.eliminarProducto(id);
      return;
    }
    const productoExistente = this.cartService.getCart().find(p => p.id === id);
    if (productoExistente) {
      const nuevoProducto = {...productoExistente, cantidad};
      this.cartService.addProduct(nuevoProducto);
    }
  }
}
