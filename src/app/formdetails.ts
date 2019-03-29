import {NgForm} from '@angular/forms';


export class Formdetails {
  public kword: string;
  public category=-1;
  public conditionNew: boolean;
  public conditionUsed:boolean;
  public conditionUnspecified:boolean;
  public shippingLocal:boolean;
  public shippingFree:boolean;
  public distance:string;
  public location:string;
  public zipcode:string;
  public currentlocation:string;

  constructor() {
    this.category=-1;
    this.location="current";
    this.conditionNew=false;
    this.conditionUsed=false;
    this.conditionUnspecified=false;
    this.shippingLocal=false;
    this.shippingFree=false;
    this.distance="";
    this.zipcode="";
  }




  //formdetails: any;
   // createFormObj(kword,category,conditionNew,conditionUsed,conditionUnspecified,shippingLocal,shippingFree,distance,location){
   //  this.formdetails  = new Formdetails('hello','baby',true,true,false,
   //     true,false,'10','here');
   //
   //   console.log(this.formdetails);
   // }

}
