import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export class FormValidators {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && (control.value.trim() == 0)) {
      return {notOnlyWhiteSpace: true};
    } else {
      return null;
    }
  }

  static pdfFileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File | null;

    if (!file) {
      return null;
    }

    const allowedTypes = [
      'application/pdf'
    ];

    return allowedTypes.includes(file.type) ? null : { invalidFileType: true };
  }

  static imgValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || value.trim() === '') {
      return null;
    }
    const extension = value.split('.').pop()?.toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png'];
    return validExtensions.includes(extension!) ? null : { invalidImageType: true };
  }
}
