import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';
import {NoWhitespaceValidator} from './keyword';




@Directive({
  selector: '[myNoSpaces]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomKeywordDirective, multi: true }]
})
export class CustomKeywordDirective implements Validator {

  private valFn = NoWhitespaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}

