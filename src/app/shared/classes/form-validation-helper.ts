import { FormGroup } from '@angular/forms';

export class FormValidationHelper {
  static hasError(formGroup: FormGroup, controlName?: string, errorName?: string): boolean {
    // If only formGroup has passed
    if (!controlName) {
      return formGroup.invalid;
    }

    // If a specific error has passed
    if (errorName) {
      return formGroup.controls[controlName].hasError(errorName);
    }

    return formGroup.controls[controlName].invalid;
  }

  static markAllTouched(formGroup: FormGroup): void {
    for (const control in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(control) ) {
        formGroup.controls[control].markAsTouched();
      }
    }
  }
}
