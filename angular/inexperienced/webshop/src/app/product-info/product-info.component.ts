import { Component, OnInit } from '@angular/core';
import ProductService from '../config/product.service';
import { ActivatedRoute } from '@angular/router';
import ProductInterface from 'src/types/ProductInterface';
import ReviewInterface from 'src/types/ReviewInterface';
import LoginService from '../config/login.service';
import UserInterface from 'src/types/UserInterface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CartService from '../config/cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnInit {
  id: string
  productById: ProductInterface;
  reviews: ReviewInterface[] = []

  reviewForm = new FormGroup({
    rating: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)],),
    comment: new FormControl('', [Validators.required, Validators.minLength(10)])
  })

  user: UserInterface | null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;

      this.productService.getProductById(this.id).subscribe(res => {
        this.productById = res;
      });

      this.fetchReviews()
    })

    this.loginService.user.subscribe(user => this.user = user)
  }

  fetchReviews() {
    this.productService.getProductReviews(this.id).subscribe(res => {
      this.reviews = res;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.productById)
    alert('Added to cart! :)')
  }

  addReview() {
    if (!this.user) {
      alert('Please login to add a review')
      return
    }

    this.reviewForm.markAllAsTouched()

    if (this.reviewForm.invalid) {
      return alert('Invalid form!')
    }

    this.productService.addReview(
      this.id,
      this.reviewForm.value.rating!,
      this.reviewForm.value.comment!,
      this.user.token
    ).subscribe(() => this.fetchReviews())

    this.reviewForm.reset({
      rating: 0,
      comment: ''
    })
  }
}
