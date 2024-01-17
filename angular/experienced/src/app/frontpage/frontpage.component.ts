import { Component } from '@angular/core';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
  providers: [ProductService],
})
export class FrontpageComponent {
  contents: Product[] | undefined;

  constructor(private productService: ProductService) {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((results) => {
      this.contents = results.sort((a, b) => b.price - a.price).slice(0, 6);
    });
  }
}
