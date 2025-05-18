import {AfterViewInit, Component, inject} from '@angular/core';
import {ReactiveFormsModule, Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {ApiPanaderiaService} from '../../services/apiPanaderia.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormValidators} from '../../validators/formValidators';

@Component({
  selector: 'app-trabaja-con-nosotros',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './trabaja-con-nosotros.component.html',
  styleUrl: './trabaja-con-nosotros.component.css'
})
export class TrabajaConNosotrosComponent implements AfterViewInit {
  private readonly panaderiaService = inject(ApiPanaderiaService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  formContact: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(100), FormValidators.notOnlyWhiteSpace]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(4),
      Validators.maxLength(100), FormValidators.notOnlyWhiteSpace]],
    mensaje: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(5000), FormValidators.notOnlyWhiteSpace]],
    cv: [null, [Validators.required, FormValidators.pdfFileValidator]]
  });

  get nombre() {
    return this.formContact.get('nombre');
  }
  get email() {
    return this.formContact.get('email');
  }
  get mensaje() {
    return this.formContact.get('mensaje');
  }
  get cv() {
    return this.formContact.get('cv');
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

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
        formData.append('cv_archivo', this.formContact.value.cv);
      }

      console.log('Datos listos para enviar al backend:', formData);

      this.panaderiaService.postSolicitudEmpleo(formData).subscribe(
        {
          complete: () => {
            alert('Solicitud empleo enviada');
            this.formContact.reset();
          },
          error: err => {
            console.log(err);
          }
        }
      )
    }
  }
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'formulario') {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
