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
    if (!file) return null;
    return file.type === 'application/pdf' ? null : {invalidFileType: true};
  }
  static imgValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File | null;
    if (!file) return null;
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return validTypes.includes(file.type) ? null : { invalidImageType: true };
  }
}
