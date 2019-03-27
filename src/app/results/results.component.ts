import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CallEbayService} from '../call-ebay.service';
import {ProdDetailsComponent} from '../prod-details/prod-details.component';
import {WishlistService} from '../wishlist.service';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  searchJson;
  pageSize=10;
  page=1;
  addWishClicked:boolean=false;
  cart;
  stArray:any;
  @Input() itSet:Set<String>=new Set<String>();
  inWishList:boolean=true;
  @ViewChild(ProdDetailsComponent) prod:ProdDetailsComponent;

  ngOnInit() {
    this.stArray=this.wish.getStorage();
    //this.itArray=this.stArray.map(x=>x.itemId);

    for(var i=0;i<this.stArray.length;i++){
      this.itSet.add(this.stArray[i].itemId[0]);
    }

    console.log(this.itSet);
  }

  setParentValue(){

    this.stArray=this.wish.getStorage();
    //this.itArray=this.stArray.map(x=>x.itemId);

    for(var i=0;i<this.stArray.length;i++){
      this.itSet.add(this.stArray[i].itemId[0]);
    }
    this.showresults=true;
  }



  showresults:boolean=true;
  error:boolean=false;
  errorMessage:string;
  constructor(private ebaysearch: CallEbayService,private wish:WishlistService) {

    this.wish.observer.subscribe(data=>{

      let x=this.wish.getStorage();
      console.warn(x);
      this.itSet.clear();
      for(var i=0;i<x.length;i++){
        this.itSet.add(x[i].itemId[0]);
      }
      console.error(this.itSet);
    });


  }



  callChild(itemId,title,row){
       this.showresults=false;
       this.prod.callDetailServices(itemId,title,row);

  }

  checkValidJson(searchJson){
    if(searchJson['findItemsAdvancedResponse'][0]['searchResult']==undefined||
      searchJson['findItemsAdvancedResponse'][0]['searchResult'][0]['item']==undefined||
      searchJson['findItemsAdvancedResponse'][0]['searchResult'][0]['item'].length==0 )
    {
          this.error=true;
          this.errorMessage="No records found";
          return false;
    }
//handle case error 36
    if(searchJson['findItemsAdvancedResponse']['0']['errorMessage']!==undefined &&
      searchJson['findItemsAdvancedResponse']['0']['errorMessage']['0']['error']['0']['errorId']=='18'){
          this.error=true;
          this.errorMessage="Invalid Zip code";
          return false;
    }

    if(searchJson['findItemsAdvancedResponse']['0']['errorMessage']!==undefined &&
      searchJson['findItemsAdvancedResponse']['0']['errorMessage']['0']['error']['0']['errorId']=='36'){
      this.error=true;
      this.errorMessage="Invalid Key word";
      return false;
    }
    return true;
  }

  buildSearchTable(searchJson: any) {
    //console.log(searchJson)
      if(this.checkValidJson(searchJson)){
          this.error=false;

      }

  }

 callEbayservice(formdata){

    // this.ebaysearch.callEbay(formdata).subscribe(data => {
    //   this.searchJson=data;
    //   console.log(this.searchJson);
    // })
   this.showresults=true;
   this.prod.showResults=false;
   this.ebaysearch.callEbay(formdata).subscribe(data=>{
     this.searchJson=data;
     console.log(this.searchJson);
     //console.log(this.searchJson);
     this.buildSearchTable(this.searchJson);
   });
 }




  addToWish(row){
    this.itSet.add(row.itemId[0]);
    console.log('adding to hash');
    console.log(this.itSet);
    this.wish.storeItem(row);

  }

  removeFromWish(row){

    console.log('removing from hash');
    this.itSet.delete(row.itemId[0]);
    this.wish.removeItem(row);
    console.log(this.itSet);
  }

  refreshHash($event: any) {
    this.itSet=$event;
  }



}
