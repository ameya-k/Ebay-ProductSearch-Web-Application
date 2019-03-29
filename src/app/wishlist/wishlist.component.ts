import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {WishlistService} from '../wishlist.service';
import {ItemDetailsService} from '../item-details.service';
import {WishProdService} from '../wish-prod.service';
import {ProdDetailsComponent} from '../prod-details/prod-details.component';
import {ClearService} from '../clear.service';

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


 sum:number=0;
  constructor(private ws: WishlistService,private item:ItemDetailsService,private wp:WishProdService,private clr:ClearService) {
        this.clr.receiveClear().subscribe(data=>{
          this.wishInactive();
        })

  }

  private wishInactive() {
      console.log('inside wish clear!');
      this.showWishList=false;

  }

  calcSum(){
    let wsArray=this.ws.getStorage();
    this.sum=0;
    for(var i=0;i<wsArray.length;i++){
      console.log(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__']);
      this.sum+=parseFloat(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__'])
    }
  }
  ngOnInit() {
    let wsArray=this.ws.getStorage();
    this.sum=0;
    for(var i=0;i<wsArray.length;i++){
      console.log(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__']);
      this.sum+=parseFloat(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__'])
    }
    console.log(this.sum);

  }


  removeFromTable(row) {
    //service that removes from local storage

    this.ws.removeItem(row);
    let wsArray=this.ws.getStorage();
    this.sum=0;
    for(var i=0;i<wsArray.length;i++){
      console.log(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__']);
      this.sum+=parseFloat(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__'])
    }
    console.log(this.sum);


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
