import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {

  constructor(private idetails:HttpClient) { }

  getItemDetails(item_id):any{
    let url="http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=AmeyaKul-CSCI571H-PRD-9a6d2f14d-216c0559&siteid=0&version=967&IncludeSelector=Description,Details,ItemSpecifics&ItemID="+item_id;
    console.log(url);
    return this.idetails.get(url);

  }
}
