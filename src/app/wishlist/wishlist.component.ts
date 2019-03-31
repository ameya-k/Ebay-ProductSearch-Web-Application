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

  myWL: any;

  wishset:Set<any>=new Set();
  wishArray;
  @ViewChild(ProdDetailsComponent) prodChild:ProdDetailsComponent;

  //made a variable to store item detail data
  ijson;
  isDetailSearchPerformed:boolean=false;
  currRow;

  ngOnInit() {
    let wsArray=this.ws.getStorage();
    this.myWL = Object.assign([], this.ws.getStorage());
    this.sum=0;
    for(var i=0;i<wsArray.length;i++){
      console.log(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__']);
      this.sum+=parseFloat(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__'])
    }
    console.log(this.sum);

  }

  refreshWL(){
    this.myWL = Object.assign([], this.ws.getStorage());
  }
  private highlightCurrentRow(row) {

    console.log('inside highlight wish showing row');
    console.log(JSON.stringify(row));

    this.currRow=row;
    if(row==this.currRow){
      console.log('rows equal');
    }
    console.log('inside highlight wish showing current');
    console.log(JSON.stringify(this.currRow));
  }


 sum:number=0;
  constructor(private ws: WishlistService,private item:ItemDetailsService,private wp:WishProdService,private clr:ClearService) {

        this.ws.observer.subscribe(data=>{
           this.refreshWL();
        });
        this.clr.receiveClear().subscribe(data=>{
          this.wishInactive();
        })

  }

  private wishInactive() {
      console.log('inside wish clear!');
      this.showWishList=false;
      this.currRow=null;
      this.isDetailSearchPerformed=false;

  }

  calcSum(){
    let wsArray=this.ws.getStorage();
    this.sum=0;
    for(var i=0;i<wsArray.length;i++){
      console.log(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__']);
      this.sum+=parseFloat(wsArray[i]['sellingStatus'][0]['currentPrice'][0]['__value__'])
    }
  }



  removeFromTable(row) {
    //service that removes from local storage

    this.ws.removeItem(row);
    //this.myWL = Object.assign([], this.ws.getStorage());
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
    console.log('Inside call wish product');
    console.log(JSON.stringify(row));
    this.highlightCurrentRow(row);

    this.showWishList=false;

    this.isDetailSearchPerformed=true;
    console.log("itemId:"+itemId);
    console.log("title"+title);
    console.log(row);
    this.prodChild.callDetailServices(itemId,title,row,2);

  }


  showWishChild($event: boolean) {
    this.showWishList=true;
  }



}
