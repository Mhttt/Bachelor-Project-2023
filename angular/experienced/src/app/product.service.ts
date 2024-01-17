import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewReview } from './productpage/productpage.component';
import { CookieService } from './cookie.service';
import { PurchaseOrder } from './purchasehistory.service';
import { throwError } from 'rxjs';

@Injectable()
export class ProductService {
  private apiURL = 'http://143.42.222.62:8000';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllProducts() {
    return this.http
      .get<Product[]>(`${this.apiURL}/products`, { responseType: 'json' })
      .pipe();
  }

  getSingleProduct(productId: string) {
    return this.http
      .get<Product>(`${this.apiURL}/products/${productId}`, {
        responseType: 'json',
      })
      .pipe();
  }

  checkout() {
    const cart = this.cookieService.getCookie('cart');
    let checkoutObj: { items: Item[] } = { items: [] };
    if (typeof cart === 'string') {
      let items: { productId: string; quantity: number }[] = JSON.parse(cart);
      items.forEach((item: { productId: string; quantity: number }) => {
        checkoutObj.items.push({
          product_id: item.productId, 
          quantity: item.quantity,
        });
      });
      this.cookieService.deleteCookie('cart');
      return this.http.post<{ items: Item[] }>(
        `${this.apiURL}/purchase`,
        checkoutObj,
        { headers: this.cookieService.addAuthHeader() }
      );
    }
    return throwError(new Error('No items in cart'));
  }

  getReviews(productId: string) {
    return this.http
      .get<Review[]>(`${this.apiURL}/products/reviews/${productId}`, {
        responseType: 'json',
      })
      .pipe();
  }

  getOrder(orderId: string) {
    return this.http
      .get<PurchaseOrder>(`${this.apiURL}/purchases/${orderId}`, {
        headers: this.cookieService.addAuthHeader(),
      })
      .pipe();
  }

  postReview(review: NewReview) {
    return this.http.post<Review>(
      `${this.apiURL}/products/reviews/add`,
      review,
      { headers: this.cookieService.addAuthHeader() }
    );
  }
}

export interface Product {
  _id: string;
  name: string;
  long_description: string;
  price: number;
  short_description: string;
  image_url: string;
}

export interface Review {
  _id: string;
  comment: string;
  rating: number | null;
}

interface Item {
  product_id: string;
  quantity: number;
}
