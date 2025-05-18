import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FormValidators {
  static notOnlyWhiteSpace: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };

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
