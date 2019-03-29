import { Injectable } from '@angular/core';
import {ProdDetailsComponent} from './prod-details/prod-details.component';
import {WishlistComponent} from './wishlist/wishlist.component';

@Injectable({
  providedIn: 'root'
})
export class WishProdService {

  constructor(

    // private pr:ProdDetailsComponent
  ) { }

  callProdDeatils(itemId,title,row){
       console.log('inside wish prod');


       // this.pr.callDetailServices(itemId,title,row);


  }
}
