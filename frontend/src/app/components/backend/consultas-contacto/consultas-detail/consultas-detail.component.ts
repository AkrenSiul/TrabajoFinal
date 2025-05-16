import {Component, inject, Input, OnInit} from '@angular/core';
import {ApiPanaderiaService} from '../../../../services/apiPanaderia.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../../AuthService/AuthService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-consultas-detail',
  imports: [
    DatePipe
  ],
  templateUrl: './consultas-detail.component.html',
  styleUrl: './consultas-detail.component.css'
})
export class ConsultasDetailComponent implements OnInit {
  @Input('id')id!: string;
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService);
  private readonly panaderiaService = inject(ApiPanaderiaService);
  consulta: any
  admin = false;

  ngOnInit() {
    this.getConsultaDetail(this.id);
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.admin = isAdmin;
      if (!this.admin) {
        this.router.navigate(['/inicio']);
      }
    });
  }

  getConsultaDetail(id: string) {
    this.panaderiaService.getConsulta(id).subscribe(
      {
        next: value => {
          this.consulta = value;
        },
        error: err => {
        console.log(err)
      },
        complete: () => {
        console.log('Producto traído correctamente')
      }
    })
  }
}
