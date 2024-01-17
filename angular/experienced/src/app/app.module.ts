import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductpageComponent } from './productpage/productpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ShippingheaderComponent } from './shippingheader/shippingheader.component';
import { LoginComponent } from './login/login.component';
import { PurchasehistoryComponent } from './purchasehistory/purchasehistory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { PurchaseOrderComponent } from './purchaseOrder/purchaseOrder.component';

@NgModule({
  declarations: [
    AppComponent,
    AllproductsComponent,
    FrontpageComponent,
    ProductpageComponent,
    CartComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    PurchasehistoryComponent,
    PurchaseOrderComponent,
    ShippingheaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
