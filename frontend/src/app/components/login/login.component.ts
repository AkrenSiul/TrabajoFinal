import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private loginUsuarios = [
    {
      usuarios: "luis",
      contrasenya: "1234"
    }
  ]
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
    const usuario = this.formLogin.value.usuario;
    const contrasenya = this.formLogin.value.contrasenya;

    this.login(usuario, contrasenya);
    return this.mensaje = 'ngOnSubmit Activado';
  }

  login(usuario: string, contrasenya: string): boolean {
    const user = this.loginUsuarios.find((u) => u.usuarios === usuario && u.contrasenya === contrasenya);
    if(user) {
      this.mensaje = 'Login correcto, usuario conectado';
      setTimeout(() => {
        this.mensaje = '';
      }, 2000);
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
    return !!user;
  }

  registrar(usuario: string, contrasenya: string): boolean {
    const existe = this.loginUsuarios.find((u) => u.usuarios === usuario);
    if (existe) {
      this.mensaje = 'Este usuario ya existe';
      return false;
    }
    this.loginUsuarios.push({ usuarios: usuario, contrasenya });
    this.mensaje = 'Usuario registrado correctamente';
    return true;
  }

  getUsuarios(): any[] {
    return this.loginUsuarios;
  }

}
