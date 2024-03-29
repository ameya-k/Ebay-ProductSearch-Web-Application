import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemDetailsService} from '../item-details.service';
import {SimilarItemsService} from '../similar-items.service';
import {GooglePhotosService} from '../google-photos.service';
import {forEach} from '@angular/router/src/utils/collection';
import {RoundProgressModule} from 'angular-svg-round-progressbar'
import {ResultsComponent} from '../results/results.component';
import {WishlistService} from '../wishlist.service';
import {FacebookService} from '../facebook.service';
import {ClearService} from '../clear.service';
import {ResetProductService} from '../reset-product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {style, trigger, state, transition, animate} from '@angular/animations';




@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css'],
  animations: [
    trigger('progressIn', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0%)'}))
      ]),


    ]),
    trigger('tableSlide', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('100ms ease-in', style({transform: 'translateX(0%)'}))
      ]),


    ])


  ]




})
export class ProdDetailsComponent implements OnInit {

  showDiv:boolean=true;
  sjson;
  itemDetailsJson;
  itemArray:any[];
  photosJson;
  similarItemsJson;
  subsimjson;
  prodclicked:boolean=true;
  photclicked:boolean;
  shipclicked:boolean;
  sellclicked:boolean;
  simclicked:boolean;
  prodVisible=false;
  butLabel="Show More";
  order:string='ascending';
  storageArray:any;
  prodSet:Set<string>=new Set<string>();
  identifyParent:number=1;
  showpbar:boolean=false;
  showpbar1:boolean=false;
  showpbar2:boolean=false;

  currentRow:any;
  showResults=true;
  deepCopy:any[];
  link:string;
  @Output() sendValueToResult= new EventEmitter<boolean>();
  @Output() sendValueToWishlist=new EventEmitter<boolean>();
  @Output() sendHashSetToResult=new EventEmitter();




  constructor(private detailService:ItemDetailsService,private simService: SimilarItemsService,private picService:GooglePhotosService,
              private wish:WishlistService,private clr:ClearService) {

    this.clr.receiveClear().subscribe(data=>{
      console.log(data);
      this.clearResult();
    });




  }

  private clearResult() {
     console.log('inside product clear');
      this.similarItemsJson=null;
      this.itemDetailsJson=null;
      this.photosJson=null;
      this.showResults=true;
      this.showpbar=false;
      //set other show pbar variables here
      this.showpbar2=false;
      this.showpbar1=false;
      this.prodclicked=true;
      this.photclicked=false;
      this.shipclicked=false;
      this.sellclicked=false;
      this.simclicked=false;
      // this.resetProd();
  }

  togbtn(){
    if(this.butLabel=="Show More"){
      this.butLabel="Show Less";
    }
    else if(this.butLabel=="Show Less"){
      this.butLabel="Show More";
    }
  }


  emitToParent(){
    this.prodclicked=true;
    this.showResults=false;

    this.photclicked=false;
    this.shipclicked=false;
    this.sellclicked=false;
    this.simclicked=false;

    if(this.identifyParent==1){
      this.sendValueToResult.emit(true);
      this.sendHashSetToResult.emit(this.prodSet);
    }
    else if(this.identifyParent==2){
      this.sendValueToWishlist.emit(true);

    }

  }
  ngOnInit() {


  }




resetProd(){
  //   console.error('inside reset product');
  // document.getElementById('pills-prod-tab').classList.add('active');
  // document.getElementById('pills-prod-tab').classList.add('show');
  // document.getElementById('prodtab').classList.add('active');
  // document.getElementById('prodtab').classList.add('show');
  // // document.getElementById('pills-prod-tab').setAttribute('aria-selected','true');
  // // document.getElementById('pills-photos-tab').setAttribute('area-selected','false');
  //
  // if(document.getElementById('pills-photos-tab').classList.contains('active')){
  //   document.getElementById('pills-photos-tab').classList.remove('active');
  //   document.getElementById('photostab').classList.remove('active');
  //   document.getElementById('photostab').classList.remove('show');
  // }
  this.prodclicked=true;
  this.photclicked=false;
  this.sellclicked=false;
  this.shipclicked=false;
  this.simclicked=false;
}



  callDetailServices(item_id,title,searchJson,parentId){

    this.itemDetailsJson=null;
    this.similarItemsJson=null;
    this.photosJson=null;


    console.log('inside call services from wishlist');
    console.log(this.showResults);
    this.identifyParent=parentId;
    this.storageArray=this.wish.getStorage();
    //this.itArray=this.stArray.map(x=>x.itemId);
    this.prodSet.clear();
    for(var i=0;i<this.storageArray.length;i++){
      this.prodSet.add(this.storageArray[i].itemId[0]);
    }
    this.detailService.getItemDetails(item_id).subscribe(data=>{
      this.itemDetailsJson=data;
      this.showpbar=false;
      this.currentRow=searchJson;
      console.log('current row');
      console.log(this.currentRow);
      // this.buildItemDetailsTable(this.itemDetailsJson);
      console.log(this.itemDetailsJson);
      this.link="https://www.facebook.com/dialog/share?app_id= 1028804487317941&display=popup";
      let q="Buy "+encodeURIComponent(this.currentRow.title)+" at $"+this.itemDetailsJson['Item']['CurrentPrice']['Value']+" from link below";
      this.link+="&quote="+q;
      let href=this.itemDetailsJson['Item']['ViewItemURLForNaturalSearch'];
      this.link+="&href="+href;

    });

    this.simService.getSimilarItems(item_id).subscribe(data=>{
      this.similarItemsJson=data;
      //Object.assign(this.deepCopy,this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item);
      this.deepCopy=Object.assign([],this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item);
      this.itemArray=this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item;
      this.showpbar1=false;
      //Object.assign(this.deepCopy,this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item);
      console.log(this.similarItemsJson);
      // console.log(this.itemArray);
    });



    this.picService.getGooglePhotos(title).subscribe(data=>{
      this.photosJson=data;
      console.log(this.photosJson);
      this.showpbar2=false;

    });
   this.sjson=searchJson;

   this.showResults=true;




   console.log(this.showResults);








  }

    callWish(){
      this.prodSet.add(this.currentRow.itemId[0]);
      this.wish.storeItem(this.currentRow);

    }

    removeWish(){
      this.prodSet.delete(this.currentRow.itemId[0]);
      this.wish.removeItem(this.currentRow);
    }

   sort(value){
      console.log(value);
      let sortOrder=this.getOrder();

      if(value=='default'){
        this.itemArray=this.deepCopy;
          // var sel=document.getElementById('sorder') as HTMLSelectElement;
          // this.sort(sel.options[sel.selectedIndex].value);
        document.getElementById('sorder').setAttribute('disabled','disabled');
      }
      else{
        document.getElementById('sorder').removeAttribute('disabled');
      }
      if(value=='ProductName'){
            this.itemArray.sort(function(x,y) {
              // if(x.title<y.title){
              //   return -1;
              // }
              // if(x.title>y.title){
              //   return 1;
              // }
              // return 0;
              return x.title.localeCompare(y.title);
            })
      }

      if(value=='DaysLeft'){
          this.itemArray.sort(function(x,y) {
            if((Number.parseInt(x.timeLeft.substring(x.timeLeft.lastIndexOf('P')+1,x.timeLeft.lastIndexOf('D'))))>
              (Number.parseInt(y.timeLeft.substring(y.timeLeft.lastIndexOf('P')+1,y.timeLeft.lastIndexOf('D'))))){
               return 1;
            }

            if((Number.parseInt(x.timeLeft.substring(x.timeLeft.lastIndexOf('P')+1,x.timeLeft.lastIndexOf('D'))))<
              (Number.parseInt(y.timeLeft.substring(y.timeLeft.lastIndexOf('P')+1,y.timeLeft.lastIndexOf('D'))))){
              return -1;
            }
            
            return 0;
            
          })
      }

      if(value=='Price'){
          this.itemArray.sort(function(x,y) {
            if(Number.parseFloat(x.buyItNowPrice.__value__)<Number.parseFloat(y.buyItNowPrice.__value__)){
              return -1;
            }
            if(Number.parseFloat(x.buyItNowPrice.__value__)>Number.parseFloat(y.buyItNowPrice.__value__)){
              return 1;
            }
            return 0;
          })
      }

     if(value=='ShippingCost'){
          this.itemArray.sort(function(x,y) {
            if(Number.parseFloat(x.shippingCost.__value__)<Number.parseFloat(y.shippingCost.__value__)){
              return -1;
            }
            if(Number.parseFloat(x.shippingCost.__value__)>Number.parseFloat(y.shippingCost.__value__)){
                return 1;
            }
            return 0;

          })
     }
      if(sortOrder=='descending' && value!='default'){
        console.log(this.itemArray);
        this.itemArray=this.itemArray.reverse();
        console.log(this.itemArray);
      }



  }


  setOrder(value){
    console.log(value);
    this.order=value;
    var sel=document.getElementById('sortAttr') as HTMLSelectElement;
    this.sort(sel.options[sel.selectedIndex].value);
  }

  getOrder(){
    return this.order;
  }





    prod_clicked(){
      this.prodclicked=true;
      this.photclicked=false;
      this.shipclicked=false;
      this.simclicked=false;
      this.sellclicked=false;
    }

    phot_clicked(){
      this.photclicked=true;
      this.prodclicked=false;

      this.shipclicked=false;
      this.simclicked=false;
      this.sellclicked=false;
    }

    ship_clicked(){
      this.shipclicked=true;
      this.prodclicked=false;
      this.photclicked=false;

      this.simclicked=false;
      this.sellclicked=false;
    }

    sell_clicked(){
      this.sellclicked=true;
      this.prodclicked=false;
      this.photclicked=false;
      this.shipclicked=false;
      this.simclicked=false;

    }

    sim_clicked(){
      this.prodclicked=false;
      this.photclicked=false;
      this.shipclicked=false;
      this.simclicked=true;
      this.sellclicked=false;
    }




}
