import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDetailsService} from '../item-details.service';
import {SimilarItemsService} from '../similar-items.service';
import {GooglePhotosService} from '../google-photos.service';
import {forEach} from '@angular/router/src/utils/collection';
import {RoundProgressModule} from 'angular-svg-round-progressbar'
import {ResultsComponent} from '../results/results.component';
import {WishlistService} from '../wishlist.service';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit {

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
  prodSet:Set<string>=new Set<string>();

  currentRow:any;
 showResults=true;
  deepCopy:any[];
  @Output() sendValueToResult= new EventEmitter<boolean>();

  constructor(private detailService:ItemDetailsService,private simService: SimilarItemsService,private picService:GooglePhotosService,
              private wish:WishlistService) {}
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
    this.sendValueToResult.emit(true);
  }
  ngOnInit() {

  }






  callDetailServices(item_id,title,searchJson){
    this.detailService.getItemDetails(item_id).subscribe(data=>{
      this.itemDetailsJson=data;
      this.currentRow=searchJson;
      console.log(this.currentRow);
      // this.buildItemDetailsTable(this.itemDetailsJson);
      console.log(this.itemDetailsJson);

    });

    this.simService.getSimilarItems(item_id).subscribe(data=>{
      this.similarItemsJson=data;
      //Object.assign(this.deepCopy,this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item);
      this.deepCopy=Object.assign([],this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item);
      this.itemArray=this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item;

      //Object.assign(this.deepCopy,this.similarItemsJson.getSimilarItemsResponse.itemRecommendations.item);
      console.log(this.similarItemsJson);
      // console.log(this.itemArray);
    });



    this.picService.getGooglePhotos(title).subscribe(data=>{
      this.photosJson=data;
      console.log(this.photosJson);

    });
   this.sjson=searchJson;
   this.showResults=true;








  }

    callWish(){
      this.wish.storeItem(this.currentRow);

    }

    removeWish(){
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
              if(x.title<y.title){
                return -1;
              }
              if(x.title>y.title){
                return 1;
              }
              return 0;
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
