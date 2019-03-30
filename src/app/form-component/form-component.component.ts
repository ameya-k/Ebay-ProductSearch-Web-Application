import {Component, OnInit, ViewChild} from '@angular/core';
import { Formdetails } from '../formdetails';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ZipAutoCompleteService} from '../zip-auto-complete.service';

import {CallEbayService} from '../call-ebay.service';
import {debounce, debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ResultsComponent} from '../results/results.component';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {group} from '@angular/animations';
import {ClearService} from '../clear.service';




@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {


  isValidForm:boolean=true;
  zipDisable:boolean=true;

  form:FormGroup;

  constructor( private ip: HttpClient,private zip_service: ZipAutoCompleteService,private ebaysearch: CallEbayService,
               private clr:ClearService) {
    //this.zipcode.valueChanges.pi

    this.zipcode.valueChanges
      .pipe(debounceTime(400))
      .subscribe(data => {
        this.zip_service.getZip(data).subscribe(response => {
          if (response[0] != null && response[0] != "undefined" && response[0] != "Undefined")
            this.ziparray = response;

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

    //call child method
      console.log(this.formdetails);
      console.log('submitting to result');
      this.child.showResults=true;
      console.log(this.child.showResults);
      this.child.callEbayservice(this.formdetails);
      this.child.showProgress=true;


  }



  clearForm(form: NgForm){


    console.log(form);

    //    //   this.wish_child.showWishList=false;
    //    //   this.child.showResults=true;
    //    // }


    form.resetForm({category: -1,
      kword: '',
      location: 'current',
      conditionNew:false,
      conditionUsed:false,
      conditionUnspecified:false,
      shippingLocal:false,
      shippingFree:false,
      zipcode:'',
    });

    document.getElementById('resultTab').classList.add('active');
    //
    document.getElementById('wishTab').classList.remove('active');

    console.log("after clear");
    console.log(this.formdetails);

    this.clr.broadcastClear(true);



  }

  showChildResult(){

     this.child.showresults=true;
     this.wish_child.showWishList=false;

  }

  showChildWishList(){
    this.wish_child.calcSum();
    this.wish_child.showWishList=true;
    this.child.showresults=false;
    this.child.prod.showResults=false;
    this.wish_child.prodChild.showResults=false;
  }


  togZip() {
    this.zipDisable=!this.zipDisable;
  }
  //
  enableZip() {
    let a=document.getElementById('zipcodebox');
    a.removeAttribute('disabled')
  }

  disableZip() {
    let a=document.getElementById('zipcodebox');
    a.setAttribute('disabled','disabled');
  }
}
