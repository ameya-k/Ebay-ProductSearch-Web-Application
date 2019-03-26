import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SimilarItemsService {

  constructor(private simservice:HttpClient) { }

  getSimilarItems(item_id):any{

    let url="http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService" +
      "&SERVICE-VERSION=1.1.0&CONSUMER-ID=AmeyaKul-CSCI571H-PRD-9a6d2f14d-216c0559&RESPONSE-DATA-FORMAT=JSON&" +
      "REST-PAYLOAD&itemId="+item_id+"&maxResults=20";
      console.log(url);
     return this.simservice.get(url);

  }
}
