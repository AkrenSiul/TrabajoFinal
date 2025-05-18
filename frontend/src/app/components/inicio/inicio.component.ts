import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbCarousel, NgbModal, NgbPagination, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {InterfaceProductos} from '../../common/productos';
import {AuthService} from '../AuthService/AuthService';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {CurrencyPipe, NgClass} from '@angular/common';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {CartService} from '../../services/cart.service';
import {ApiPanaderiaService} from '../../services/apiPanaderia.service';
import {FormValidators} from '../../validators/formValidators';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NgbCarousel,
    NgbSlide,
    FaIconComponent,
    ReactiveFormsModule,
    CurrencyPipe,
    FormsModule,
    NgClass,
    NgbPagination
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  @ViewChild('modalEditar', { static: true }) modalEditar!: TemplateRef<any>;
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ApiPanaderiaService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private modalService = inject(NgbModal)
  productos: InterfaceProductos[] = [];
  productosRandom: InterfaceProductos[] = [];
  editandProducto: string | null = null;
  selectedFile: File | null = null;
  admin = false;
  categorias: any;
  login: any;
  categoriaSeleccionada: number | null = null;
  page = 1;
  pageSize = 8;
  protected readonly faEdit = faEdit;
  protected readonly faCartPlus = faCartPlus;
  protected readonly faTrash = faTrash;
  cartItems: { [productoId: string]: number } = {};
  formProduct: FormGroup = this.formBuilder.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), FormValidators.notOnlyWhiteSpace]],
      descripcion: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255), FormValidators.notOnlyWhiteSpace]],
      imagen_url: [null , FormValidators.imgValidator],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0 , [Validators.required, Validators.min(0)]],
      categoria_id: [],
    }
  )

  get nombre() {
    return this.formProduct.get('nombre');
  }
  get descripcion() {
    return this.formProduct.get('descripcion');
  }

  get imagen_url() {
    return this.formProduct.get('imagen_url');
  }

  get precio() {
    return this.formProduct.get('precio');
  }

  get stock() {
    return this.formProduct.get('stock');
  }

  get productosPaginados(): InterfaceProductos[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.productos.slice(start, end);
  }

  getStockDisponible(producto: InterfaceProductos): number {
    const enCarrito = this.cartService.getCart().find(p => p.id === producto.id)?.cantidad || 0;
    return producto.stock - enCarrito;
  }

  constructor() {
    this.getProductos();
    this.getCategoria();
    this.productosRandom = this.randomProductos(this.productos);
  }
  ngOnInit() {
    this.authService.isAdmin$.subscribe( isAdmin =>
      {
        this.admin = isAdmin;
      }
    )
    this.authService.loginOn$.subscribe(isLogin => {
      this.login = isLogin;
    }
    )
  }
  randomProductos(array: InterfaceProductos[]): InterfaceProductos[] {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  getProductos(categoriaId: number | null = null) {
    let url = 'http://localhost:8000/api/producto';
    if (categoriaId !== null) {
      url += `?categoria_id=${categoriaId}`;
    }
    this.productService.getProducts(url).subscribe(
      {
        next: productos => {
          this.productos = productos.map(producto => ({
            ...producto,
            cantidad: 1,
          }))
          this.productosRandom = this.randomProductos(this.productos);
        },
        error: err => {
          console.log(err.message);
          this.productos = [];
        },
        complete: () => {
          console.log('Productos traídos');
        }
      }
    )
  }

  editModal(producto: any) {
    this.editandProducto = producto.id;

    this.formProduct.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen_url: producto.imagen_url,
      precio: producto.precio,
      stock: producto.stock,
      categoria_id: producto.categoria?.id || null
    });
    this.modalService.open(this.modalEditar, { centered: true });
  }

  edit() {
    if (this.formProduct.valid && this.editandProducto) {
      const formData = new FormData();

      formData.append('nombre', this.formProduct.get('nombre')?.value || 'Ejemplo Test');
      formData.append('descripcion', this.formProduct.get('descripcion')?.value || 'Ejemplo Test');
      formData.append('precio', this.formProduct.get('precio')?.value || 24);
      formData.append('stock', this.formProduct.get('stock')?.value || 24);

      const categoriaValue = this.formProduct.get('categoria_id')?.value;
      if (categoriaValue !== null && categoriaValue !== undefined && categoriaValue !== '') {
        formData.append('categoria_id', categoriaValue.toString());
      }

      if (this.selectedFile) {
        formData.append('imagen_url', this.selectedFile);
      }

      this.productService.updateProduct(this.editandProducto, formData).subscribe({
        next: () => {
          this.getProductos();
          this.modalService.dismissAll();
          this.editandProducto = null;
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }

  delete(id: string) {
    const confirmado = window.confirm('¿Estás seguro de que quieres borrar este producto?');

    if (confirmado) {
      this.productService.deleteProduct(id).subscribe(
        {
          complete: () => {
            alert('Producto eliminado correctamente')
            this.getProductos();
          },
          error: err => {
            this.productos = [];
            console.log(err);
          }
        }
      )
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!allowedTypes.includes(file.type)) {
        this.selectedFile = null;
        this.formProduct.get('imagen_url')?.setErrors({invalidImageType: true});
        this.formProduct.patchValue({imagen_url: null});
      } else {
        this.selectedFile = file;
        this.formProduct.patchValue({imagen_url: file.name});
        this.formProduct.get('imagen_url')?.setErrors(null);
      }
      this.formProduct.get('imagen_url')?.updateValueAndValidity();
    }
  }

  addToCart(producto: InterfaceProductos) {
    const cantidad = producto.cantidad || 1;
    const enCarrito = this.cartItems[producto.id] || 0;
    const disponible = producto.stock - enCarrito;

    if (cantidad > disponible) {
      alert(`Solo puedes añadir ${disponible} unidades. Ya tienes ${enCarrito} en el carrito.`);
      return;
    }
    this.cartItems[producto.id] = enCarrito + cantidad;
    this.cartService.addProduct({
      ...producto,
      cantidad: this.cartItems[producto.id]
    });
  }

  getCategoria() {
    this.productService.getCategorias().subscribe(
      {
        next: categoria => {
          this.categorias = categoria;
        },
        error: err => {
          console.log(err.message);
        }
      }
    );
  }

  onCategoriaChange(categoriaId: number | null) {
    this.getProductos(categoriaId);
  }
}
