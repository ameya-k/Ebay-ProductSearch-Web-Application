import {Component, OnInit, ViewChild} from '@angular/core';
import { Formdetails } from '../formdetails';
import {FormControl, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ZipAutoCompleteService} from '../zip-auto-complete.service';

import {CallEbayService} from '../call-ebay.service';
import {debounce, debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ResultsComponent} from '../results/results.component';
import {WishlistComponent} from '../wishlist/wishlist.component';



@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {




  constructor( private ip: HttpClient,private zip_service: ZipAutoCompleteService,private ebaysearch: CallEbayService ) {

    //this.zipcode.valueChanges.pi

    this.zipcode.valueChanges
      .pipe(debounceTime(400))
      .subscribe(data => {
        this.zip_service.getZip(data).subscribe(response => {
          if (response[0] != null && response[0] != "undefined" && response[0] != "Undefined")
            this.ziparray = response
        })
      })

  }

  zipcode: FormControl=new FormControl();

  ziparray:string[];

  setLocation(response){
    this.formdetails.currentlocation=response['zip'];
  }

  ngOnInit() {

    let obs=this.ip.get("http://ip-api.com/json");
    obs.subscribe((response)=>this.setLocation(response));

  }

  @ViewChild(ResultsComponent) child;
  @ViewChild(WishlistComponent) wish_child;
  submitted=false;
  formdetails=new Formdetails();

  onFormSubmit(form: NgForm) {

    // this.formdetails.kword=form.controls['kword'].value;
    // this.formdetails.category=form.controls['category'].value;
    // this.formdetails.conditionNew=form.controls['conditionNew'].value;
    // this.formdetails.conditionUsed=form.controls['conditionUsed'].value;
    // this.formdetails.conditionUnspecified=form.controls['conditionUnspecified'].value;
    // this.formdetails.shippingLocal=form.controls['shippingLocal'].value;
    // this.formdetails.shippingFree=form.controls['shippingFree'].value;
    // this.formdetails.distance=form.controls['distance'].value;
    // this.formdetails.location=form.controls['location'].value;
    // console.log(this.formdetails.location);
    // if(this.formdetails.location=='current'){
    //   this.formdetails.zipcode=form.controls['currentlocation'].value;
    // }
    // if(this.formdetails.location=='zip'){
    //   this.formdetails.zipcode=form.controls['zipcodebox'].value;
    // }

    //console.log(this.formdetails.kword);
    // console.log(this.formdetails.category);
    // console.log(this.formdetails.conditionNew);
    // console.log(this.formdetails.conditionUsed);
    // console.log( this.formdetails.conditionUnspecified);
    // console.log(this.formdetails.shippingLocal);
    // console.log( this.formdetails.shippingFree);
    // console.log(this.formdetails.distance);
    // console.log(this.formdetails.location);
    // console.log(this.formdetails.currentlocation);
    //console.log(this.formdetails.zipcode);



    //callebay() service pass formdetails

    //this.ebaysearch.callEbay(this.formdetails);

    //call child method

  this.child.callEbayservice(this.formdetails);


  }

  clearForm(form: NgForm){

    if(form.controls['kword']!=undefined){
      form.controls['kword'].setValue("");
    }
   if(form.controls['category']!=undefined){
     form.controls['category'].setValue(-1);
   }

   if(form.controls['conditionNew']!=undefined){
     form.controls['conditionNew'].setValue(false);
   }

   if( form.controls['conditionUsed']!=undefined){
     form.controls['conditionUsed'].setValue(false);
   }

   if(form.controls['conditionUnspecified']!=undefined){
     form.controls['conditionUnspecified'].setValue(false);
   }

   if(form.controls['shippingLocal']!=undefined){
     form.controls['shippingLocal'].setValue(false);
   }

    if(form.controls['shippingFree']!=undefined){
      form.controls['shippingFree'].setValue(false);
    }

    if( form.controls['distance']!=undefined){
      form.controls['distance'].setValue("");
    }
    if(form.controls['location']!=undefined){
      form.controls['location'].setValue("current");
    }
    if(form.controls['zipcode']!=undefined){
      form.controls['zipcode'].setValue("");
    }



  }

  showChildResult(){
     this.child.showresults=true;
  }

  showChildWishList(){
    this.wish_child.showWishList=true;
  }








}
