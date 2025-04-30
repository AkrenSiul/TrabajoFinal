import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestServiceService} from '../../services/test-service.service';
import {AuthService} from '../AuthService/AuthService';
import {Router} from '@angular/router';

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
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly testService: TestServiceService = inject(TestServiceService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formLogin: FormGroup = this.formBuilder.group(
    {
      usuario: [''],
      contrasenya: [''],
    }
  );
  get usuarios(): any {
    return this.formLogin.get('usuario')
  }
  get contrasenyas(): any {
    return this.formLogin.get('contrasenya')
  }
  mensaje = ''
  constructor() {
  }

  onSubmit(){
    if(this.formLogin.valid) {
      const usuario = this.formLogin.value.usuario;
      const contrasenya = this.formLogin.value.contrasenya;

      this.testService.postLogin(usuario, contrasenya).subscribe(
        {
          next: value => {
            localStorage.setItem('loginOn', 'true');
            localStorage.setItem('usuario', value.usuario.usuario);
            localStorage.setItem('rol', value.usuario.rol)
            console.log(value.usuario.rol)
            this.mensaje = 'Bienvenido ' + value.usuario;
            console.log('Usuario conectado');
            this.router.navigateByUrl('/inicio')
          },
          error: err => {
            this.mensaje = 'Error al iniciar sesión';
            this.mensaje = 'Login error';
            console.log(err.message)
            this.formLogin.reset();
          }
        }
      )
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('Usuario logueado:', this.authService.getUsuario());
    } else {
      console.log('No logueado');
    }
  }


}
