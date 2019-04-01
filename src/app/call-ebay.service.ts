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
     // console.log("inside call ebay service function");
     //  let url="http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=AmeyaKul-CSCI571H-PRD-9a6d2f14d-216c0559&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50";
     //  let cnt=0;
     //  if(formdata.kword!=null){
     //    url+="&keywords="+encodeURIComponent(formdata.kword);
     //  }
     //
     //
     //
     //  if(formdata.category!=-1 && formdata.category!=null){
     //    url+="&categoryId="+formdata.category;
     //  }
     //
     //  if(formdata.location=="zip"){
     //    url+="&buyerPostalCode="+formdata.zipcode;
     //  }
     //  else if(formdata.location=="current"){
     //    url+="&buyerPostalCode="+formdata.currentlocation;
     //  }
     //
     //  if(formdata.distance=='' || formdata.distance==null){
     //    url+="&itemFilter("+cnt+").name=MaxDistance&itemFilter("+cnt+").value="+10;
     //    cnt++;
     //  }
     //  else {
     //    url+="&itemFilter("+cnt+").name=MaxDistance&itemFilter("+cnt+").value="+formdata.distance;
     //    cnt++;
     //  }
     //
     //  if(formdata.shippingFree && formdata.shippingFree!=null){
     //    url+="&itemFilter("+cnt+").name=FreeShippingOnly&itemFilter("+cnt+").value="+formdata.shippingFree;
     //    cnt++;
     //  }
     //
     //  if(formdata.shippingLocal && formdata.shippingLocal!=null){
     //    url+="&itemFilter("+cnt+").name=LocalPickupOnly&itemFilter("+cnt+").value="+formdata.shippingLocal;
     //    cnt++;
     //  }
     //
     //  url+="&itemFilter("+cnt+").name=HideDuplicateItems&itemFilter("+cnt+").value=true";
     //  cnt++;
     //  var cond_cnt=0;
     //  if(formdata.conditionNew && formdata.conditionNew!=null){
     //      url+="&itemFilter("+cnt+").name=Condition&itemFilter("+cnt+").value("+cond_cnt+")=New";
     //
     //      cond_cnt++;
     //  }
     //
     //  if(formdata.conditionUsed && formdata.conditionUsed!=null){
     //    url+="&itemFilter("+cnt+").name=Condition&itemFilter("+cnt+").value("+cond_cnt+")=Used";
     //
     //    cond_cnt++;
     //  }
     //
     //  if(formdata.conditionUnspecified && formdata.conditionUnspecified!=null){
     //    url+="&itemFilter("+cnt+").name=Condition&itemFilter("+cnt+").value("+cond_cnt+")=Unspecified";
     //    cond_cnt++;
     //  }
     //
     //  url+="&outputSelector(0)=SellerInfo+&outputSelector(1)=StoreInfo";
     //
     //  console.log(url);
      //http://ameyabk117-angularweb8.appspot.com

     // let url_call="http://localhost:3000/ebaySearchTable/";
      let url_call="http://ameyanodemodule-dot-ameyabk117-angularweb8.appspot.com/ebaySearchTable/";
      url_call+=Object.keys(formdata).map(key => key + '=' + formdata[key]).join('&');
      console.log(url_call);
      return this.ebaySearch.get(url_call);








   }

}
