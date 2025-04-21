import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestServiceService} from '../../services/test-service.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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

  usuario = '';
  contrasenya = '';
  mensaje = '';
  constructor() {
  }

  onSubmit(){
    if(this.formLogin.valid) {
      const usuario = this.formLogin.value.usuario;
      const contrasenya = this.formLogin.value.contrasenya;

      this.testService.postLogin(usuario, contrasenya).subscribe(
        {
          next: value => {
            this.mensaje = 'Bienvenido ' + value.usuario.usuario;
            console.log('Usuario conectado');
          },
          error: err => {
            this.mensaje = 'Error al iniciar sesión';
            console.log('Login error', err.message);
          }
        }
      )
    }
  }

}
