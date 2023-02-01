import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { FseProspectComponent } from './tables/fse-prospect/fse-prospect.component';
import { FseInstallationDetailsComponent } from './tables/fse-installation-details/fse-installation-details.component';
import { FseProspectProductImagesComponent } from './tables/fse-prospect-product-images/fse-prospect-product-images.component';
import { UsersComponent } from './tables/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FseProspectDetailsComponent } from './tables/fse-prospect-details/fse-prospect-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    FseProspectComponent,
    FseInstallationDetailsComponent,
    FseProspectProductImagesComponent,
    UsersComponent,
    FseProspectDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
