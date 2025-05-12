import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiPanaderiaService} from '../../services/apiPanaderia.service';

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
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      consulta: ['', Validators.required]
    }
  )

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
