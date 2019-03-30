import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearService {

  private clrsubject=new Subject<any>();


  constructor() { }

  broadcastClear(clear:boolean){
    console.log('broadcasting clear');
    this.clrsubject.next(clear);
  }

  receiveClear():Observable<any>{
      return this.clrsubject.asObservable();
  }
}
