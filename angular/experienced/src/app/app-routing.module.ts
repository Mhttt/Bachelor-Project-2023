import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { RegisterComponent } from './register/register.component';
import { PurchasehistoryComponent } from './purchasehistory/purchasehistory.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseOrderComponent } from './purchaseOrder/purchaseOrder.component';

const routes: Routes = [
  {
    path: '',
    component: FrontpageComponent,
  },
  {
    path: 'all-products',
    component: AllproductsComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product/:id',
    component: ProductpageComponent,
  },
  {
    path: 'purchase-order/:id',
    component: PurchaseOrderComponent,
  },
  {
    path: 'purchase-history',
    component: PurchasehistoryComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
