import { FormGroup } from '@angular/forms';

export class FormHelper {
  /**
   * Verify if formGroup has any error
   *
   * @param formGroup - FormGroup
   * @param controlName - FormControlName
   * @param errorName - Validation name
   */
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

  /**
   * Mark all formControl of formGroup as touched
   *
   * @param formGroup - FormGroup
   */
  static markAllTouched(formGroup: FormGroup): void {
    for (const control in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(control) ) {
        formGroup.controls[control].markAsTouched();
      }
    }
  }

  /**
   * Set value for formControl of a formGroup based passed model
   *
   * @param formGroup - FormGroup
   * @param model - Model
   * @param ignoreList - FormControls to be ignored
   * @param mapping - Custom mapping
   */
  static setFormGroupValues(formGroup: FormGroup, model: {}, ignoreList?: string[], mapping?: {}): void {
    // Iterate over all formControls in the group
    for (const control in formGroup.controls) {
      // If control is in the ignore list
      if (ignoreList && ignoreList.length && ignoreList.find((item) => item === control)) {
        continue;
      }

      if (formGroup.controls.hasOwnProperty(control) ) {
        let modelProperty = control;

        // Verify if exists a custom mapping for formControl
        if (mapping && mapping[control]) {
          modelProperty = mapping[control];
        }

        // Verify if model contains a property with same name of formControl
        if (model[modelProperty] !== undefined && model[modelProperty] !== null) {
          formGroup.controls[control].setValue(model[modelProperty]);
        }
      }
    }
  }

  static getValuesFromFormGroup(formGroup: FormGroup, ignoreList?: string[]): any {
    const valuesObject: {} = formGroup.value;

    // Remove items from ignore list
    for (const property in valuesObject) {
      if (valuesObject.hasOwnProperty(property)) {
        if (ignoreList && ignoreList.length && ignoreList.find((item) => item === property)) {
          delete valuesObject[property];
        }
      }
    }

    return valuesObject;
  }
}
