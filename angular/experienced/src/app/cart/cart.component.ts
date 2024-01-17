import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CookieService } from '../cookie.service';
import { cartItem } from '../productpage/productpage.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductService, CookieService],
})
export class CartComponent {
  cartProducts: CartProduct[] = [];
  checkoutObj: { items: Item[] } = { items: [] };

  constructor(
    private productService: ProductService,
    private cookieService: CookieService
  ) {
    this.getCartProducts();
  }

  getCartProducts() {
    let cart = JSON.parse(this.cookieService.getCookie('cart') || '{}');
    cart.forEach((item: cartItem) => {
      let quantity = item.quantity;
      this.productService
        .getSingleProduct(item.productId)
        .subscribe((results) => {
          this.cartProducts.push({
            _id: results._id,
            name: results.name,
            long_description: results.long_description,
            price: results.price,
            short_description: results.short_description,
            image_url: results.image_url,
            quantity: quantity,
          } as CartProduct);
        });
    });
    console.log(cart);
  }

  removeProductFromCart(productId: string | undefined) {
    if (this.cartProducts.length === 1) {
      this.cookieService.deleteCookie('cart');
    }
    this.cartProducts.forEach((item, index) => {
      if (item._id === productId) {
        this.cartProducts.splice(index, 1);
      }
    });
  }

  getTotalPrice(products: CartProduct[]) {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  purchaseCart() {
    this.productService.checkout().subscribe((results)=> {
      console.log(results);
    })
  }
}

export interface CartProduct {
  _id: string;
  name: string;
  long_description: string;
  price: number;
  short_description: string;
  image_url: string;
  quantity: number;
}

interface Item {
  product_id: string;
  quantity: number;
}
