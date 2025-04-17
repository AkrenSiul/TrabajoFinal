import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  formContact = this.formBuilder.group(
    {
      nombre: [''],
      email: [''],
      telefono: [''],
      consulta: [''],
    }
  )

  getNombre(): any {
    this.formContact.get('nombre')
  }
  getEmail(): any {
    this.formContact.get('email')
  }
  getPhone(): any {
    this.formContact.get('telefono')
  }
  getConsulta(): any {
    this.formContact.get('consulta')
  }

}
