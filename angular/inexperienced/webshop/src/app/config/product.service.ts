import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ProductInterface from 'src/types/ProductInterface';
import ReviewInterface from 'src/types/ReviewInterface';

@Injectable()
export default class ProductService {
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<ProductInterface[]>("http://143.42.222.62:8000/products")
  }

  getProductById(id: string) {
    return this.http.get<ProductInterface>(`http://143.42.222.62:8000/products/${id}`)
  }

  getFrontpageProducts() {
    return this.http.get<ProductInterface[]>(`http://143.42.222.62:8000/products?limit=6`)
  }

  getProductReviews(id: string) {
    return this.http.get<ReviewInterface[]>(`http://143.42.222.62:8000/products/reviews/${id}`)
  }

  addReview(product_id: string, rating: number, comment: string, token: string) {
    return this.http.post(`http://143.42.222.62:8000/products/reviews/add`, {
      product_id,
      rating,
      comment,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
  }
}
