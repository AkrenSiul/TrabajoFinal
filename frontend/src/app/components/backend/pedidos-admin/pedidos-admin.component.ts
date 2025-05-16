import {Component, inject, OnInit} from '@angular/core';
import {ApiPanaderiaService} from '../../../services/apiPanaderia.service';
import {AuthService} from '../../AuthService/AuthService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pedidos-admin',
  imports: [],
  templateUrl: './pedidos-admin.component.html',
  styleUrl: './pedidos-admin.component.css'
})
export class PedidosAdminComponent implements OnInit {
  private readonly panaderiaService = inject(ApiPanaderiaService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  admin = false;

   ngOnInit() {
     this.authService.isAdmin$.subscribe(isAdmin => {
       this.admin = isAdmin;
       if (!this.admin) {
         this.router.navigate(['/inicio']);
       }
     });
   }

}
