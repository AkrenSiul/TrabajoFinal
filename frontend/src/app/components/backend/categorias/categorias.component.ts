import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiPanaderiaService} from '../../../services/apiPanaderia.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../AuthService/AuthService';
import {Router} from '@angular/router';
import {faUserPen} from '@fortawesome/free-solid-svg-icons/faUserPen';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';

@Component({
  selector: 'app-categorias',
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  @ViewChild('modalEditar', { static: true }) modalEditar!: TemplateRef<any>;
  @ViewChild('modalCreate', { static: true }) modalCreate!: TemplateRef<any>;
  private readonly modalService = inject(NgbModal);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly panaderiaService = inject(ApiPanaderiaService);
  categorias: any[] = [];
  editandoCategoria: number | null = null;
  admin = false;
  mensaje = '';
  faPenToSquare = faPenToSquare;

  formCategoria: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required]]
  });

  get nombre() {
    return this.formCategoria.get('nombre');
  }
  get descripcion() {
    return this.formCategoria.get('descripcion');
  }

  constructor() {
    this.getCategorias();
  }
  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.admin = isAdmin;
      if (!this.admin) {
        this.router.navigate(['/inicio']);
      }
    });
  }

  getCategorias() {
    this.panaderiaService.getCategoriaAll().subscribe({
      next: value => {
        this.categorias = value;
      },
      error: err => {
        console.error('Error cargando categorías', err.message);
      }
    });
  }

  deleteCategoria(id: string){
    const confirmado = window.confirm('¿Estás seguro de que quieres borrar esta categoria?');

    if (confirmado) {
      this.panaderiaService.deleteCategoria(id).subscribe(
        {
          complete: () => {
            alert('Usuario eliminado')
            this.getCategorias();
          },
          error: err => {
            console.log(err.err.message);
          }
        }
      )
    }
  }
  updateCategoria(categoria: any) {
    this.editandoCategoria = categoria.id;

    this.formCategoria.patchValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });

    this.modalService.open(this.modalEditar, {
      centered: true
    });
  }
  abrirCrear() {
    this.editandoCategoria = null;
    this.formCategoria.reset();
    this.mensaje = '';
    this.modalService.open(this.modalEditar, {
      centered: true
    });
  }
  crear() {
    if (this.formCategoria.valid) {
      const nuevaCategoria = this.formCategoria.value;
      this.panaderiaService.createCategoria(nuevaCategoria).subscribe({
        next: () => {
          this.mensaje = 'Categoría creada correctamente';
          this.getCategorias();
          this.modalService.dismissAll();
        },
        error: err => {
          console.error('Error al crear la categoría', err);
          this.mensaje = 'Error al crear la categoría';
        }
      });
    }
  }

  editar() {
    if (this.formCategoria.valid && this.editandoCategoria) {
      const datos = this.formCategoria.value;
      this.panaderiaService.updateCategoria(this.editandoCategoria.toString(), datos).subscribe({
        next: () => {
          this.mensaje = 'Categoría actualizada correctamente';
          this.getCategorias();
          this.modalService.dismissAll();
          this.editandoCategoria = null;
        },
        error: err => {
          console.error('Error al actualizar la categoría', err);
          this.mensaje = 'Error al actualizar la categoría';
        }
      });
    }
  }
}
