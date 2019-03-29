import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GooglePhotosService {

  constructor(private googleHttp:HttpClient) { }

  getGooglePhotos(title):any{
    let url="https://www.googleapis.com/customsearch/v1?q="+encodeURIComponent(title)+"&cx=016865113679854894358:-ggfxfoc38i&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyBZtSgUprgt5sQE9Mb3j7nnIOv-lpK43SM";
    return this.googleHttp.get(url);
  }

}
