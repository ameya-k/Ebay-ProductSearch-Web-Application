import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CallEbayService} from '../call-ebay.service';
import {ProdDetailsComponent} from '../prod-details/prod-details.component';
import {WishlistService} from '../wishlist.service';
import {FormComponentComponent} from '../form-component/form-component.component';
import {ClearService} from '../clear.service';
import {ResetProductService} from '../reset-product.service';
import {animate, style, transition, trigger} from '@angular/animations';




@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  animations:[
    trigger('resultOut',[
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('resultIn', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0%)'}))
      ]),

    ])
  ]
})
export class ResultsComponent implements OnInit {

 //myVar:boolean=true;
  //backClicked:boolean=true;
  searchJson;
  pageSize=10;
  page=1;
  showProgress:boolean=false;
  isDetailSearchPerformed:boolean=false;


  //private backClicked: boolean=true;
  

  clearResult() {

    console.log('inside clear');
    this.currentRow=null;
    this.isDetailSearchPerformed=false;
    this.error=false;
    this.pageSize=10;
    this.page=1;
    this.showresults=true;
    this.showProgress=false;
    this.searchJson=null;
  }


  stArray:any;
  @Input() itSet:Set<String>=new Set<String>();


  @ViewChild(ProdDetailsComponent) prod:ProdDetailsComponent;

  ngOnInit() {
    this.stArray=this.wish.getStorage();
    //this.itArray=this.stArray.map(x=>x.itemId);

    for(var i=0;i<this.stArray.length;i++){
      this.itSet.add(this.stArray[i].itemId[0]);
    }

    console.log(this.itSet);
  }

  setParentValue($event){
    //this.backClicked=false;
    //this.myVar=true;
    //console.error("myvar:"+this.myVar);
    this.stArray=this.wish.getStorage();
    //this.itArray=this.stArray.map(x=>x.itemId);

    for(var i=0;i<this.stArray.length;i++){
      this.itSet.add(this.stArray[i].itemId[0]);
    }
    this.showresults=true;
  }


  currentRow;
  highlightCurrentRow(row) {

      this.currentRow=row;
      console.log('row is'+row);
  }

  showresults:boolean=true;
  error:boolean=false;
  errorMessage:string;
  constructor(private ebaysearch: CallEbayService,private wish:WishlistService,private clr:ClearService) {
      

    
      this.clr.receiveClear().subscribe(data=>{
        this.clearResult();
      });
    // this.frm.clrobserver.subscribe(data=>{
    //     //   console.log('clear pressed');
    //     // });


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



  callChild(itemId,title,row,parent){

        this.highlightCurrentRow(row);
        this.showresults=false;
        //this.activeTab="product";
        //this.myVar=false;
        this.isDetailSearchPerformed=true;

        this.prod.resetProd();

       console.log('progress shown');

        //this.rst.sendResetMessage();
       this.prod.callDetailServices(itemId,title,row,parent);
       this.prod.showpbar=true;
       this.prod.showpbar1=true;
       this.prod.showpbar2=true;

  }

  checkValidJson(searchJson){
    if(searchJson['findItemsAdvancedResponse'][0]['searchResult']==undefined||
      searchJson['findItemsAdvancedResponse'][0]['searchResult'][0]['item']==undefined||
      searchJson['findItemsAdvancedResponse'][0]['searchResult'][0]['item'].length==0 )
    {
          this.error=true;
          this.errorMessage="No records.";
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
   console.log('inside result'+this.showresults);
   this.showresults=true;
   console.log(this.showresults);

   this.prod.showResults=false;
   this.ebaysearch.callEbay(formdata).subscribe(data=>{
     this.searchJson=data;
     console.log(this.searchJson);
     this.showProgress=false;
     //console.log(this.searchJson);
     this.buildSearchTable(data);
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
