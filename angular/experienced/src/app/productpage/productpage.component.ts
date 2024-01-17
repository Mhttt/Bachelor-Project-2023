import { Component } from '@angular/core';
import { Product, ProductService, Review } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
  providers: [ProductService, CookieService],
})
export class ProductpageComponent {
  product: Product | undefined;
  reviews: Review[] | undefined;
  productId: string | undefined;

  newReview: NewReview = {
    comment: '',
    product_id: '',
    rating: null,
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.route.params.subscribe((routes) => (this.productId = routes['id']));

    if (this.productId) {
      this.getProduct(this.productId);
      this.getReviews(this.productId);

      this.newReview.product_id = this.productId;
    }
  }

  addProductToCart(productId: string | undefined) {
    if (!this.cookieService.getCookie('cart')) {
      this.cookieService.setCookie(
        'cart',
        JSON.stringify([{ productId: productId, quantity: 1 } as cartItem]),
        { expires: 7 }
      );
      alert('Added to cart');
    } else {
      let cart = JSON.parse(this.cookieService.getCookie('cart') || '{}');
      let found = false;
      cart.forEach((item: cartItem) => {
        if (item.productId === productId) {
          item.quantity += 1;
          found = true;
          alert('Added to cart');
        }
      });
      if (!found) {
        cart.push({ productId: productId, quantity: 1 });
        alert('Added to cart');
      }
      this.cookieService.setCookie('cart', JSON.stringify(cart), {
        expires: 7,
      });
    }
  }

  onSelected(value: string) {
    this.newReview.rating = Number(value);
  }

  onComment(value: string) {
    this.newReview.comment = value;
  }

  postReview() {
    console.log(this.newReview);
    if (
      this.newReview.comment &&
      this.newReview.product_id &&
      this.newReview.rating
    ) {
      alert('Review has been added');
      return this.productService
        .postReview(this.newReview)
        .subscribe((result) => {
          console.log(result);
        });
    }
    return alert('You must enter a comment and rating');
  }

  getProduct(productId: string) {
    this.productService.getSingleProduct(productId).subscribe((result) => {
      this.product = result;
    });
  }

  getReviews(productId: string) {
    this.productService.getReviews(productId).subscribe((result) => {
      this.reviews = result;
    });
  }

  isLoggedIn() {
    return this.cookieService.isLoggedIn();
  }
}

export interface NewReview {
  comment: string;
  product_id: string;
  rating: number | null;
}

export interface cartItem {
  productId: string;
  quantity: number;
}
