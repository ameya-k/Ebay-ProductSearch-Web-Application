import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallEbayService {

  ebayResponse:Observable<any>;

  constructor(private ebaySearch: HttpClient) { }

   callEbay(formdata):any{
     console.log("inside call ebay service function");
      let url="http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=AmeyaKul-CSCI571H-PRD-9a6d2f14d-216c0559&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50";
      let cnt=0;
      url+="&keywords="+formdata.kword;


      if(formdata.category!=-1){
        url+="&categoryId="+formdata.category;
      }

      if(formdata.location=="zip"){
        url+="&buyerPostalCode="+formdata.zipcode;
      }
      else if(formdata.location=="current"){
        url+="&buyerPostalCode="+formdata.currentlocation;
      }

      if(formdata.distance==''){
        url+="&itemFilter("+cnt+").name=MaxDistance&itemFilter("+cnt+").value="+10;
        cnt++;
      }
      else{
        url+="&itemFilter("+cnt+").name=MaxDistance&itemFilter("+cnt+").value="+formdata.distance;
        cnt++;
      }

      if(formdata.shippingFree){
        url+="&itemFilter("+cnt+").name=FreeShippingOnly&itemFilter("+cnt+").value="+formdata.shippingFree;
        cnt++;
      }

      if(formdata.shippingLocal){
        url+="&itemFilter("+cnt+").name=LocalPickupOnly&itemFilter("+cnt+").value="+formdata.shippingLocal;
        cnt++;
      }

      url+="&itemFilter("+cnt+").name=HideDuplicateItems&itemFilter("+cnt+").value=true";
      cnt++;
      var cond_cnt=0;
      if(formdata.conditionNew){
          url+="&itemFilter("+cnt+").name=Condition&itemFilter("+cnt+").value("+cond_cnt+")=New";

          cond_cnt++;
      }

      if(formdata.conditionUsed){
        url+="&itemFilter("+cnt+").name=Condition&itemFilter("+cnt+").value("+cond_cnt+")=Used";

        cond_cnt++;
      }

      if(formdata.conditionUsed){
        url+="&itemFilter("+cnt+").name=Condition&itemFilter("+cnt+").value("+cond_cnt+")=Unspecified";
        cond_cnt++;
      }

      url+="&outputSelector(0)=SellerInfo+&outputSelector(1)=StoreInfo";

      console.log(url);
      return this.ebaySearch.get(url);
      // this.ebaySearch.get(url).subscribe(data=>{
      //    console.log("data :");
      //    console.log(data);
      // });
      // return this.ebayResponse;







   }

}
