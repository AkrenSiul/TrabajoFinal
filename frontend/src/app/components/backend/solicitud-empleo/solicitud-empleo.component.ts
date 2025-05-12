import {Component, inject, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {Router, RouterLink} from '@angular/router';
import {ApiPanaderiaService} from '../../../services/apiPanaderia.service';
import {AuthService} from '../../AuthService/AuthService';

@Component({
  selector: 'app-solicitud-empleo',
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './solicitud-empleo.component.html',
  styleUrl: './solicitud-empleo.component.css'
})
export class SolicitudEmpleoComponent implements OnInit {
  private readonly panaderiaService = inject(ApiPanaderiaService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  admin = false;
  solicitudes: any[] = [];

  protected readonly faCircleInfo = faCircleInfo;

  constructor() {
    this.getSolicitudEmpleo();
  }

  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.admin = isAdmin;
      if (!this.admin) {
        this.router.navigate(['/inicio']);
      }
    });
  }

  deleteSolicitud(id: string){
    const confirmado = window.confirm('¿Estás seguro de que quieres borrar esta solicitud?');

    if (confirmado) {
      this.panaderiaService.deleteSolicitudEmpleo(id).subscribe(
        {
          complete: () => {
            alert('Solicitud eliminada')
            this.getSolicitudEmpleo();
          },
          error: err => {
            console.log(err.err.message);
          }
        }
      )
    }
  }
  getSolicitudEmpleo() {
    this.panaderiaService.getSolicitudEmpleo().subscribe(
      {
        next: value => {
          this.solicitudes = value;
        },
        error: err => {
          console.log(err.message);
        }
      }
    )
  }
}
