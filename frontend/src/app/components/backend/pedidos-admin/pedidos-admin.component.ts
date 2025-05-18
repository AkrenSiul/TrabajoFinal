import {Component, inject, OnInit} from '@angular/core';
import {ApiPanaderiaService} from '../../../services/apiPanaderia.service';
import {AuthService} from '../../AuthService/AuthService';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {InterfacePedidoDetalles} from '../../../common/pedido-detalles';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pedidos-admin',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './pedidos-admin.component.html',
  styleUrl: './pedidos-admin.component.css'
})
export class PedidosAdminComponent implements OnInit {
  private readonly panaderiaService = inject(ApiPanaderiaService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  admin = false;
  pedidoDetalles: InterfacePedidoDetalles[] = [];
  estados: string[] = ['pedido', 'enviado', 'entregado', 'cancelado'];
  idUser!: string;

  constructor() {
    const user = this.authService.getUsuario();
    console.log(user);
    console.log(user.id)
    if (user?.id) {
      this.idUser = user.id;
    }
  }
   ngOnInit() {
     this.authService.isAdmin$.subscribe(isAdmin => {
       this.admin = isAdmin;
       if (!this.admin) {
         this.router.navigate(['/inicio']);
       }
     });
     this.cargarPedidosDetalles();
   }
  cargarPedidosDetalles(): void {
    this.panaderiaService.getPedidos().subscribe({
      next: (data) => {
        this.pedidoDetalles = data;
      },
      error: (err) => {
        console.error('Error al cargar los pedidos', err);
      }
    });
  }

  actualizarEstado(pedido: InterfacePedidoDetalles): void {
    const data = {
      usuario_id: pedido.usuario_id,
      fecha_pedido: new Date(pedido.fecha_pedido).toISOString().split('T')[0],
      estado: pedido.estado,
      total: pedido.total
    };

    this.panaderiaService.updatePedido(pedido.id, data).subscribe({
      next: () => {
        alert('Estado actualizado correctamente');
      },
      error: err => {
        console.error('Error al actualizar el estado', err);
      }
    });
  }

  eliminarPedido(id: string): void {
    const confirmar = confirm('¿Estás seguro de eliminar este pedido? Esto también eliminará sus detalles.');
    if (confirmar) {
      this.panaderiaService.deletePedido(id).subscribe({
        next: () => {
          this.pedidoDetalles = this.pedidoDetalles.filter(p => p.id !== id);
          alert('Pedido eliminado correctamente');
        },
        error: err => {
          console.error('Error al eliminar pedido', err);
        }
      });
    }
  }
}
