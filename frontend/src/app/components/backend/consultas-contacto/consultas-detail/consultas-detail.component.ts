import {Component, inject, Input, OnInit} from '@angular/core';
import {ApiPanaderiaService} from '../../../../services/apiPanaderia.service';
import {DatePipe} from '@angular/common';

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
  private readonly panaderiaService = inject(ApiPanaderiaService);
  consulta: any

  ngOnInit() {
    this.getConsultaDetail(this.id);
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
