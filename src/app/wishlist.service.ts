import {Inject, Injectable} from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {Subject} from 'rxjs';

var STORAGE_KEY;
STORAGE_KEY='wishlist_array'
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  private subject=new Subject();

  observer=this.subject.asObservable();


  public storeItem(row){
    const curr=this.storage.get(STORAGE_KEY)||[];

    curr.push(row);
    this.storage.set(STORAGE_KEY,curr);

    console.log(this.storage.get(STORAGE_KEY)||'Local storage empty');
    this.subject.next(true);

  }

  public removeItem(row){
    const curr=this.storage.get(STORAGE_KEY)||[];


    for(var i=0;i<curr.length;i++){
      if(curr[i].itemId[0]==row.itemId[0]){
        console.log(i);
        curr.splice(i,1);
      }
    }





    this.storage.set(STORAGE_KEY,curr);

    console.log(this.storage.get(STORAGE_KEY)||'Local storage empty');
    this.subject.next(true);

  }
  public getStorage(){
    console.log('hi');
    return this.storage.get(STORAGE_KEY)||[];
  }






}
