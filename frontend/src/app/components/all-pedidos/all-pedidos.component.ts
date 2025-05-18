import {Component, inject, OnInit} from '@angular/core';
import {ApiPanaderiaService} from '../../services/apiPanaderia.service';
import {AuthService} from '../AuthService/AuthService';
import {InterfacePedidoDetalles} from '../../common/pedido-detalles';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-all-pedidos',
  imports: [
    DatePipe
  ],
  templateUrl: './all-pedidos.component.html',
  styleUrl: './all-pedidos.component.css'
})
export class AllPedidosComponent implements OnInit {
  private panaderiaService = inject(ApiPanaderiaService);
  private readonly authService = inject(AuthService);
  pedidoDetalles: InterfacePedidoDetalles[] = [];
  idUser!: string;

  constructor() {
    const user = this.authService.getUsuario();
    if(user.id) {
      this.idUser = user.id;
    }

  }

  ngOnInit() {
    this.cargarPedidosDetalles();
  }

  cargarPedidosDetalles() {
    this.panaderiaService.getPedidosDetalles(this.idUser).subscribe({
      next: (data) => {
        this.pedidoDetalles = data;
      },
      error: (err) => {
        console.error('Error al cargar los pedidos con detalles', err);
      }
    });
  }

}
