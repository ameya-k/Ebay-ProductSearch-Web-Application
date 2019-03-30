import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ZipAutoCompleteService {


  url:string;
  constructor(private call_zip:HttpClient){
      this.url="http://api.geonames.org/postalCodeSearchJSON?username=ameya_k&country=US&maxRows=5&postalcode_startsWith=";
  }


 getZip(term):any{

   return this.call_zip.get<any>(this.url + term).pipe(map(res => {
     if(term==""){
       return [];
     }
     return res.postalCodes.map(item => {

       return item.postalCode
     })
   }))
   //return this.http.get(this.url+term).pipe()

 }



}
