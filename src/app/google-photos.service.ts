import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GooglePhotosService {

  constructor(private googleHttp:HttpClient) { }

  getGooglePhotos(title):any{
    //let url="https://www.googleapis.com/customsearch/v1?q="+encodeURIComponent(title)+"&cx=006048850498458678039:ugdiyxri87g&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyArcTzsunAfUsIr9pF0ZCpk-p7YMDI5-74";
    let url="http://ameyabk117-angularweb8.appspot.com/googleCall/"+encodeURIComponent(title);
    return this.googleHttp.get(url);
  }

}
