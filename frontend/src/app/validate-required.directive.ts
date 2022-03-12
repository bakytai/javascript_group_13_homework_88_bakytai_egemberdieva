import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';
export function identicalValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const descriptionInput = control.get(fields[0]);
    const imageInput = control.get(fields[1]);
    if (descriptionInput && descriptionInput.value) {
      return null;
    } else if (imageInput && imageInput.value) {
      return null;
    }
    return {descriptionAndImage: true};
  };
}
@Directive({
  selector: '[appValidateRequired]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateRequiredDirective,
    multi: true
  }]
})
export class ValidateRequiredDirective implements Validator {
  @Input('appValidateRequired') identicalFields: string[] = [];
  validate(control: AbstractControl): ValidationErrors | null {
    return identicalValidator(this.identicalFields)(control);
  }
}
