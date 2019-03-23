import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit {

  itemDetailsJson;
  photosJson;
  similarItemsJson;

  constructor() { }

  ngOnInit() {
  }

}
