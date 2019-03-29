import { Directive } from '@angular/core';
import {NoWhitespaceValidator} from './kword';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[appKeywordValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting:  KeywordValidDirective, multi: true }]
})
export class KeywordValidDirective implements Validator{

  private valFn = NoWhitespaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }

  constructor() { }

}
