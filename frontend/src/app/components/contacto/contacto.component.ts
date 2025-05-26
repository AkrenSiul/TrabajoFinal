import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiPanaderiaService} from '../../services/apiPanaderia.service';
import {FormValidators} from '../../validators/formValidators';

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
  private panaderiaService = inject(ApiPanaderiaService);

  formContact = this.formBuilder.group(
    {
      nombre: ['', [Validators.required,Validators.minLength(4),
        Validators.maxLength(100), FormValidators.notOnlyWhiteSpace]],
      email: ['', [Validators.required, Validators.email,Validators.minLength(4),
        Validators.maxLength(100), FormValidators.notOnlyWhiteSpace]],
      telefono: ['', [Validators.required, Validators.minLength(9),
        Validators.maxLength(20), Validators.pattern(/^[\d\s\-()+]+$/)
      ]],
      consulta: ['', [Validators.required, Validators.minLength(4),
        Validators.maxLength(5000), FormValidators.notOnlyWhiteSpace]]
    }
  )
  get nombre() {
    return this.formContact.get('nombre');
  }

  get email() {
    return this.formContact.get('email');
  }

  get telefono() {
    return this.formContact.get('telefono');
  }

  get consulta() {
    return this.formContact.get('consulta');
  }

  enviarConsulta() {
    if (this.formContact.valid) {
      const formData = new FormData();
      formData.append('nombre', this.formContact.get('nombre')?.value || '');
      formData.append('email', this.formContact.get('email')?.value || '');
      formData.append('telefono', this.formContact.get('telefono')?.value || '');
      formData.append('consulta', this.formContact.get('consulta')?.value || '');

      this.panaderiaService.postConsulta(formData).subscribe({
        next: () => {
          alert('Consulta enviada con éxito');
          this.formContact.reset();
        },
        error: err => {
          console.error('Error al enviar la consulta:', err);
          alert('Ha ocurrido un error al enviar la consulta');
        }
      });
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }

}
