import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiPanaderiaService } from '../../services/apiPanaderia.service';
import { AuthService } from '../AuthService/AuthService';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild('modalRegistro', { static: true }) registroTemplate!: TemplateRef<any>;
  private readonly modalService = inject(NgbModal);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly testService = inject(ApiPanaderiaService);
  private readonly formBuilder = inject(FormBuilder);

  isRegisterOn = false;
  mensaje = '';

  formLogin: FormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    contrasenya: ['', [Validators.required, Validators.minLength(4)]],
  });

  get usuario() {
    return this.formLogin.get('usuario');
  }
  get contrasenya() {
    return this.formLogin.get('contrasenya');
  }

  ngOnInit() {
    this.authService.loginOn$.subscribe(isLogged => {
      if (isLogged) {
        console.log('Usuario ya logueado:', this.authService.getUsuario());
      }
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const usuario = this.formLogin.value.usuario.toLowerCase();
      const contrasenya = this.formLogin.value.contrasenya;

      this.testService.postLogin(usuario, contrasenya).subscribe({
        next: value => {
          this.authService.login(value.usuario.usuario, value.usuario.rol, value.usuario.email);
          this.mensaje = `Bienvenido, ` + value.usuario.usuario;
          this.router.navigateByUrl('/inicio');
        },
        error: err => {
          this.mensaje = 'Error al iniciar sesión. ' + (err.error?.messages?.error || err.message);
          this.formLogin.reset();
        }
      });
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
    const modalRef = this.modalService.open(this.registroTemplate, { centered: true });

    modalRef.result.finally(() => {
      this.isRegisterOn = false;
      this.mensaje = '';
      this.formLogin.removeControl('email');
    });
  }

  registro() {
    if (this.formLogin.valid) {
      const formData = this.formLogin.value;

      this.testService.postRegistro(formData).subscribe({
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

  addRegisterFields() {
    this.formLogin.addControl('email', this.formBuilder.control('', [Validators.required, Validators.email]));
  }
}
