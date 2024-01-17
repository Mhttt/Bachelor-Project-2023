import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { HttpClientModule } from '@angular/common/http';
import ProductService from './config/product.service';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import RegisterService from './config/register.service';
import { FreeShippingComponent } from './free-shipping/free-shipping.component';
import { LoginComponent } from './login/login.component';
import LoginService from './config/login.service';
import { StarIconComponent } from './icons/star/star.component';
import { ReviewComponent } from './product-info/review/review.component';
import CartService from './config/cart.service';
import { CartComponent } from './cart/cart.component';
import { TrashcanIconComponent } from './icons/trashcan/trashcan.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { HistoryComponent } from './history/history.component';
import { HistoryItemComponent } from './history/history-item/history-item.component';
import HistoryService from './config/history.service';
import { HistoryInfoComponent } from './history-order/history-order.component';
import { HistoryOrderItemComponent } from './history-order/history-order-item/history-order-item.component';

const icons = [
  StarIconComponent,
  TrashcanIconComponent,
]

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    AllProductsComponent,
    ProductInfoComponent,
    PageNotFoundComponentComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    FreeShippingComponent,
    ReviewComponent,
    CartComponent,
    CartItemComponent,
    HistoryComponent,
    HistoryItemComponent,
    HistoryInfoComponent,
    HistoryOrderItemComponent,
    ...icons,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService, RegisterService, LoginService, CartService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
