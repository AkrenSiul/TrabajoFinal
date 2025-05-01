import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TestServiceService} from '../../services/test-service.service';
import {AuthService} from '../AuthService/AuthService';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild('modalRegistro', { static: true }) registroTemplate!: TemplateRef<any>;
  private readonly modalService = inject(NgbModal);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly testService: TestServiceService = inject(TestServiceService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  isRegisterOn = false;
  formLogin: FormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    contrasenya: ['', [Validators.required, Validators.minLength(4)]],
  });

  get usuarios() {
    return this.formLogin.get('usuario');
  }

  get contrasenyas() {
    return this.formLogin.get('contrasenya');
  }

  mensaje = '';

  constructor() {}

  onSubmit() {
    if (this.formLogin.valid) {
      const usuario = this.formLogin.value.usuario.toLowerCase();
      const contrasenya = this.formLogin.value.contrasenya;

      this.testService.postLogin(usuario, contrasenya).subscribe(
        {
          next: value => {
            localStorage.setItem('loginOn', 'true');
            localStorage.setItem('usuario', value.usuario.usuario);
            localStorage.setItem('rol', value.usuario.rol);
            console.log(value.usuario.rol);
            this.mensaje = 'Bienvenido ' + value.usuario;
            console.log('Usuario conectado');
            this.router.navigateByUrl('/inicio');
          },
          error: err => {
            this.mensaje = 'Error al iniciar sesión. ' + (err.error?.messages?.error || err.message);
            console.log(err.message);
            this.formLogin.reset();
          }
        }
      );
    }
  }

  registroModal() {
    if (!this.registroTemplate) {
      console.warn('registroTemplate aún no está disponible');
      return;
    }
    this.isRegisterOn = true;
    this.mensaje = '';
    this.addRegisterFields();
    const modalRef = this.modalService.open(this.registroTemplate, { centered: true});

    modalRef.result.finally(() => {
      this.isRegisterOn = false;
      this.mensaje = '';
      this.formLogin.removeControl('email');
    });
  }

  registro() {
    if (this.formLogin.valid) {
      const usuario = this.formLogin.value.usuario.toLowerCase();
      const contrasenya = this.formLogin.value.contrasenya;
      const email = this.formLogin.value.email;

      this.testService.postRegistro(usuario, contrasenya, email).subscribe({
        next: () => {
          this.mensaje = 'Usuario registrado correctamente';
          this.formLogin.reset();
        },
        error: err => {
          this.mensaje = 'Error al registrar. ' + (err.error?.messages?.error || err.message);
        }
      });
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('Usuario logueado:', this.authService.getUsuario());
    } else {
      console.log('No logueado');
    }
  }

  ngAfterViewInit() {
    console.log('Registro Modal Template:', this.registroTemplate);
  }

  addRegisterFields() {
    this.formLogin.addControl('email', this.formBuilder.control('', [Validators.required, Validators.email]));
  }
}
