import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {WishlistService} from '../wishlist.service';
import {ItemDetailsService} from '../item-details.service';
import {WishProdService} from '../wish-prod.service';
import {ProdDetailsComponent} from '../prod-details/prod-details.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  showWishList:boolean=false;
  wishset:Set<any>=new Set();
  wishArray;
  @ViewChild(ProdDetailsComponent) prodChild:ProdDetailsComponent;

  //made a variable to store item detail data
  ijson;



  constructor(private ws: WishlistService,private item:ItemDetailsService,private wp:WishProdService) {


  }

  ngOnInit() {

  }


  removeFromTable(row) {
    //service that removes from local storage

    this.ws.removeItem(row);

    //getting the local storage array upon element removal


  }


  callWishProduct(itemId,title,row){
    this.showWishList=false;
    console.log("itemId:"+itemId);
    console.log("title"+title);
    console.log(row);
    this.prodChild.callDetailServices(itemId,title,row,2);

  }


  showWishChild($event: boolean) {
    this.showWishList=true;
  }
}
