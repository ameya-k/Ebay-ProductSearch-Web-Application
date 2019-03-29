import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ResultsComponent } from './results/results.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProdDetailsComponent } from './prod-details/prod-details.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { CustomKeywordDirective } from './custom-keyword.directive';
import { CustomZipDirective } from './custom-zip.directive';


@NgModule({
  declarations: [
    AppComponent,
    FormComponentComponent,
    ResultsComponent,
    WishlistComponent,
    ProdDetailsComponent,
    CustomKeywordDirective,
    CustomZipDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    RoundProgressModule,
    StorageServiceModule,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
