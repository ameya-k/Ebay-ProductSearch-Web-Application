import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {


 url="https://www.facebook.com/dialog/share?app_id= 1028804487317941&display=popup";

  constructor(private fbHttp:HttpClient) { }

  getFacebookBox(title,price,link){
    let quote="Buy"+encodeURIComponent(title)+" at "+price+" from link below";
    this.url+='&quote='+quote;
    this.url+='&href='+link
    return this.fbHttp.get(this.url);
  }
}
