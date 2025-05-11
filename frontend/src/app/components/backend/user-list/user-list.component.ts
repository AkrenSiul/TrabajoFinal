import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiPanaderiaService} from '../../../services/apiPanaderia.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons/faUserPen';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {AuthService} from '../../AuthService/AuthService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  @ViewChild('modalEditar', { static: true }) modalEditar!: TemplateRef<any>;
  private readonly modalService = inject(NgbModal);
  private readonly testService = inject(ApiPanaderiaService);
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  fauserpen = faUserPen;
  users: any[] = [];
  mensaje = '';
  editandoUsuario: number | null = null;
  isRegisterOn = false;
  admin = false;

  formUsers: FormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    contrasenya: [''],
    email: ['', [Validators.required, Validators.email]],
    rol: [],
  });

  get usuario() {
    return this.formUsers.get('usuario');
  }
  get contrasenya() {
    return this.formUsers.get('contrasenya');
  }
  get email() {
    return this.formUsers.get('email');
  }
  get rol() {
    return this.formUsers.get('rol');
  }

  constructor() {
    this.getUsuarios();
  }

  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.admin = isAdmin;
      if (!this.admin) {
        this.router.navigate(['/inicio']);
      }
    });
  }


  getUsuarios() {
    this.testService.getUsuarios().subscribe(
      {
        next: value => {
          this.users = value;
        },
        error: err => {
          console.log(err.message);
        }
      }
    )
  }
  /*getUsuarioActual() {
    this.testService.getUsuario().subscribe(
      {
        next: value => {
          this.rolUsuario = value.rol;
          console.log(value.rol);
          console.log(value);
        },
        error: err => {
          console.log(err);
        }
      }
    )

  }*/

  deleteUser(id: string){
    console.log(id);
    this.testService.deleteUsuarios(id).subscribe(
      {
        complete: () => {
          alert('Usuario eliminado')
        },
        error: err => {
          console.log(err.err.message);
        }
      }
    )
  }

  updateUser(usuario: any) {
    this.editandoUsuario = usuario.id;

    this.formUsers.patchValue({
      usuario: usuario.usuario,
      email: usuario.email,
      contrasenya: '',
      rol: usuario.rol
    });

    this.modalService.open(this.modalEditar, {
      centered: true
    });
    }
  editar() {
    if (this.formUsers.valid && this.editandoUsuario) {
      const datos = this.formUsers.value;

      this.testService.patchUsuario(this.editandoUsuario.toString(), datos).subscribe({
        next: () => {
          this.mensaje = 'Usuario actualizado correctamente';
          this.getUsuarios();
          this.modalService.dismissAll();
          this.editandoUsuario = null;
        },
        error: err => {
          console.error(err);
          this.mensaje = 'Error al actualizar el usuario';
        }
      });
    }
  }

}
