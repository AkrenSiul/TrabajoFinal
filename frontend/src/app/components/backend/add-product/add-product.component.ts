import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApiPanaderiaService} from '../../../services/apiPanaderia.service';
import {Router} from '@angular/router';
import {AuthService} from '../../AuthService/AuthService';
import {FormValidators} from '../../../validators/formValidators';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  private readonly panaderiaService = inject(ApiPanaderiaService);
  private readonly authService = inject(AuthService);
  selectedFile: File | null = null;
  categorias: any;
  admin = false;
  private readonly router = inject(Router);
  formProducto: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(100), FormValidators.notOnlyWhiteSpace]],
    descripcion: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(255), FormValidators.notOnlyWhiteSpace]],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imagen_url: [null, [Validators.required, FormValidators.imgValidator]],
    categoria_id: [null, Validators.required],
  });

  get nombre() {
    return this.formProducto.get('nombre');
  }
  get descripcion() {
    return this.formProducto.get('descripcion');
  }
  get precio() {
    return this.formProducto.get('precio');
  }
  get stock() {
    return this.formProducto.get('stock');
  }
  get imagen_url() {
    return this.formProducto.get('imagen_url');
  }
  get categoria_id() {
    return this.formProducto.get('categoria_id');
  }

  vistaPrevia = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: '',
    categoria: ''
  };


  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.admin = isAdmin;
      if (!this.admin) {
        this.router.navigate(['/inicio']);
      }
    });
    this.getCategoria();
  }

  actualizarVistaPrevia() {
    const categoriaId = this.formProducto.value.categoria_id;
    const categoriaSeleccionada = this.categorias.find((cat: { id: any; }) => cat.id === categoriaId);
    this.vistaPrevia = {
      nombre: this.formProducto.value.nombre || '',
      descripcion: this.formProducto.value.descripcion || '',
      precio: this.formProducto.value.precio || 0,
      stock: this.formProducto.value.stock || 0,
      imagenUrl: this.selectedFile ? URL.createObjectURL(this.selectedFile) : '',
      categoria: categoriaSeleccionada ? categoriaSeleccionada.nombre : ''
    };
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.formProducto.patchValue({ imagen_url: this.selectedFile.name });
      this.formProducto.get('imagen_url')?.updateValueAndValidity();
      console.log(this.selectedFile);
      this.actualizarVistaPrevia();
    }
  }

  guardarProducto() {
    console.log(this.formProducto.valid);
    console.log(this.formProducto.errors);
    console.log(this.formProducto.value);
    if (this.formProducto.valid) {
    const formData = new FormData();
    formData.append('nombre', this.formProducto.get('nombre')?.value);
    formData.append('descripcion', this.formProducto.get('descripcion')?.value);
    formData.append('precio', this.formProducto.get('precio')?.value);
    formData.append('stock', this.formProducto.get('stock')?.value);
    formData.append('categoria_id', this.formProducto.get('categoria_id')?.value);
      if (this.selectedFile) {
        formData.append('imagen_url', this.selectedFile);
      }
      this.panaderiaService.createProduct(formData).subscribe({
        next: () => {
          alert('Producto creado con éxito');
          this.router.navigate(['/inicio']);
        },
        error: err => {
          console.error('Error al crear el producto:', err);
          alert('Error al crear el producto');
        }
      });
    } else {
      alert('Formulario inválido');
    }
  }
  getCategoria() {
    this.panaderiaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }
}
