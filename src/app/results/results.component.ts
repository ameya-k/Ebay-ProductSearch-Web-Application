import { Component, OnInit } from '@angular/core';
import {CallEbayService} from '../call-ebay.service';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  searchJson;
  pageSize=10;
  page=1;

  showresults:boolean=true;
  error:boolean=false;
  errorMessage:string;
  constructor(private ebaysearch: CallEbayService) {
    //  // ebaysearch.ebayResponse.subscribe(
    //     //  //  data=>{console.log(data);}
    //     // )



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
   this.ebaysearch.callEbay(formdata).subscribe(data=>{
     this.searchJson=data;
     //console.log(this.searchJson);
     this.buildSearchTable(this.searchJson);
   });
 }

  ngOnInit() {
  }

}
