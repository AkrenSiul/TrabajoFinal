import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trabaja-con-nosotros',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trabaja-con-nosotros.component.html',
  styleUrl: './trabaja-con-nosotros.component.css'
})
export class TrabajaConNosotrosComponent {

  formContact = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    mensaje: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    cv: new FormControl<File | null>(null, { validators: Validators.required })
  });

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    console.log('Archivo seleccionado:', file);

    const cvControl = this.formContact.get('cv');

    if (file && cvControl) {
      cvControl.setValue(file);
      cvControl.markAsTouched();
      cvControl.updateValueAndValidity();
    }
  }


  onSubmit() {
    if (this.formContact.valid) {
      const formData = new FormData();
      formData.append('nombre', this.formContact.value.nombre!);
      formData.append('email', this.formContact.value.email!);
      formData.append('mensaje', this.formContact.value.mensaje!);
      if (this.formContact.value.cv) {
        formData.append('cv', this.formContact.value.cv);
      }

      console.log('Datos listos para enviar al backend:', formData);

      // Aquí puedes hacer un POST al backend con HttpClient
    }
  }
}
