import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './register/register.component';
import { FreeShippingComponent } from './free-shipping/free-shipping.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { HistoryInfoComponent } from './history-order/history-order.component';

const routes: Routes = [
  { path: '', component: FrontpageComponent },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'product/:id', component: ProductInfoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'history/:id', component: HistoryInfoComponent },
  { path: 'cart', component: CartComponent },
  { path: 'test123', component: FreeShippingComponent },
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }