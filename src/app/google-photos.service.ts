import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GooglePhotosService {

  constructor(private googleHttp:HttpClient) { }

  getGooglePhotos(title):any{
    let url="https://www.googleapis.com/customsearch/v1?q=iphone&cx=006048850498458678039:ugdiyxri87g&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyBqZbIEDuUdMKT8Bl65B5tpy-7ZCvZiAxc";
    return this.googleHttp.get(url);
  }

}
