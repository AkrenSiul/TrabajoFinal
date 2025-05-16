import {Component, inject, OnInit} from '@angular/core';
import {ApiPanaderiaService} from '../../../services/apiPanaderia.service';
import {AuthService} from '../../AuthService/AuthService';
import {Router, RouterLink} from '@angular/router';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-consultas-contacto',
  imports: [
    RouterLink,
    FaIconComponent,
    DatePipe
  ],
  templateUrl: './consultas-contacto.component.html',
  styleUrl: './consultas-contacto.component.css'
})
export class ConsultasContactoComponent implements OnInit {
  private readonly panaderiaService = inject(ApiPanaderiaService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  admin = false;
  consultas: any[] = [];

  protected readonly faCircleInfo = faCircleInfo;

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe(isAdmin => {
    this.admin = isAdmin;
    if (!this.admin) {
      this.router.navigate(['/inicio']);
    } else {
      this.getConsultas();
    }
  });
  }
  getConsultas(): void {
    this.panaderiaService.getConsultas().subscribe({
      next: value => {
        this.consultas = value;
      },
      error: err => {
        console.error('Error al obtener consultas:', err.message);
      }
    });
  }

  deleteConsulta(id: string): void {
    const confirmado = confirm('¿Estás seguro de que quieres borrar esta consulta?');
    if (confirmado) {
      this.panaderiaService.deleteConsulta(id).subscribe({
        complete: () => {
          alert('Consulta eliminada');
          this.getConsultas();
        },
        error: err => {
          console.error('Error al eliminar la consulta:', err.message);
        }
      });
    }
  }

}
