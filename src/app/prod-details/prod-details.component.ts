import { Component, OnInit } from '@angular/core';
import {ItemDetailsService} from '../item-details.service';
import {SimilarItemsService} from '../similar-items.service';
import {GooglePhotosService} from '../google-photos.service';
import {forEach} from '@angular/router/src/utils/collection';
import {RoundProgressModule} from 'angular-svg-round-progressbar'

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
  prodclicked:boolean=true;
  photclicked:boolean;
  shipclicked:boolean;
  sellclicked:boolean;
  simclicked:boolean;

  constructor(private detailService:ItemDetailsService,private simService: SimilarItemsService,private picService:GooglePhotosService) {

  }

  ngOnInit() {

  }

  // checkItemDetailsValidty(itemDetailsJson):any{
  //     //if(itemDetailsJson.)
  // }

  buildItemDetailsTable(itemDetailsJson){

    // if(this.checkItemDetailsValidty(itemDetailsJson)){
    //     //
    //     // }




  }


  callDetailServices(item_id,title,searchJson){
    this.detailService.getItemDetails(item_id).subscribe(data=>{
      this.itemDetailsJson=data;
      this.buildItemDetailsTable(this.itemDetailsJson);
      console.log(this.itemDetailsJson);

    });

    this.simService.getSimilarItems(item_id).subscribe(data=>{
      this.similarItemsJson=data;
      console.log(this.similarItemsJson);
    });



    this.picService.getGooglePhotos(title).subscribe(data=>{
      this.photosJson=data;
      console.log(this.photosJson);

    });
   this.sjson=searchJson;

  }
    prod_clicked(){
      this.prodclicked=true;
      this.photclicked=false;
      this.shipclicked=false;
      this.simclicked=false;
      this.sellclicked=false;
    }

    phot_clicked(){
      this.prodclicked=false;
      this.photclicked=true;
      this.shipclicked=false;
      this.simclicked=false;
      this.sellclicked=false;
    }

    ship_clicked(){
      this.prodclicked=false;
      this.photclicked=false;
      this.shipclicked=true;
      this.simclicked=false;
      this.sellclicked=false;
    }

    sell_clicked(){
      this.prodclicked=false;
      this.photclicked=false;
      this.shipclicked=false;
      this.simclicked=false;
      this.sellclicked=true;
    }

    sim_clicked(){
      this.prodclicked=false;
      this.photclicked=false;
      this.shipclicked=false;
      this.simclicked=true;
      this.sellclicked=false;
    }


}
