import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ZipAutoCompleteService {



  constructor(private call_zip:HttpClient){
      //this.url="http://api.geonames.org/postalCodeSearchJSON?username=ameya_k&country=US&maxRows=5&postalcode_startsWith=";
      //var url="http://localhost:3000/zipCall/"

  }


 getZip(term):any{
    //let url="http://api.geonames.org/postalCodeSearchJSON?username=ameya_k&country=US&maxRows=5&postalcode_startsWith=";
    console.log('zip term'+term);
  // if(term=='' || term==null){
  //   return
  // }
    let url="https://ameyabk117-angularweb8.appspot.com/zipCall/"+term;
   return this.call_zip.get<any>(url + term).pipe(map(res => {

     return res.postalCodes.map(item => {

       return item.postalCode
     })
   }))
   //return this.http.get(this.url+term).pipe()

 }



}
