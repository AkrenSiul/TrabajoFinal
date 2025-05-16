import {Component, inject, Input, OnInit} from '@angular/core';
import {ApiPanaderiaService} from '../../../../services/apiPanaderia.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../AuthService/AuthService';

@Component({
  selector: 'app-solicitud-empleo-detail',
  imports: [],
  templateUrl: './solicitud-empleo-detail.component.html',
  styleUrl: './solicitud-empleo-detail.component.css'
})
export class SolicitudEmpleoDetailComponent implements OnInit {
  @Input('id')id!: string;
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly panaderiaService = inject(ApiPanaderiaService);
  solicitud: any
  admin = false;

  ngOnInit() {
    this.getSolicitudDetail(this.id);

    this.authService.isAdmin$.subscribe(isAdmin => {
      this.admin = isAdmin;
      if (!this.admin) {
        this.router.navigate(['/inicio']);
      }
    });
  }

  getSolicitudDetail(id: string) {
    this.panaderiaService.getSolicitudEmpleoDetail(id).subscribe(
      {
        next: value => {
          this.solicitud = value;
        },
        error: err => {
          console.log(err)
        },
        complete: () => {
          console.log('Consulta traída correctamente')
        }
      }
    )
  }

  descargarCV(id: string) {
    this.panaderiaService.getCV(id).subscribe(
      {
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'cv_' + this.solicitud.nombre + '.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: err => {
          console.error('Error al descargar el CV:', err);
        }}
    )
  }

}
