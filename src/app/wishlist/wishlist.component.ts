import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WishlistService} from '../wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  showWishList:boolean=false;
  wishArray;



  constructor(private ws: WishlistService) {


  }

  ngOnInit() {

  }


  removeFromTable(row) {
    //service that removes from local storage
    this.ws.removeItem(row);

  }
}
