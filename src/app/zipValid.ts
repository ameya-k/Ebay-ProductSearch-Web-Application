import { AbstractControl, ValidatorFn } from '@angular/forms';


export function ZipValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {

    // messy but you get the idea
    // let isWhitespace = (control.value || '').trim().length === 0;
    //     // let isValid = !isWhitespace;
    //     // return isValid ? null : { 'whitespace': 'value is only whitespace' }

    let zipRegex=/^\d{5}$|^\d{5}-\d{4}$/;
    let isValidZip = zipRegex.test(control.value || '');
    let isValid = !isValidZip;
    return isValid ? null : { 'whitespace': 'value is only whitespace' }



  };
}
