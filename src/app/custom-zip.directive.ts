

import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

import { ZipValidator } from './zipValid';



@Directive({
  selector: '[myZip]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomZipDirective, multi: true }]
})
export class CustomZipDirective implements Validator {

  private valFn = ZipValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}

