import { Component } from '@angular/core';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css'],
  providers: [ProductService],
})
export class AllproductsComponent {
  allProducts: Product[] | undefined;
  currentProducts: Product[] | undefined;
  searchString: string | undefined;

  constructor(private productService: ProductService) {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((results) => {
      this.allProducts = results;
      this.currentProducts = results;
    });
  }

  search(searchTerm: string) {
    this.searchString = searchTerm;

    if (!searchTerm || searchTerm.length < 1) {
      return (this.currentProducts = this.allProducts);
    }

    if (this.allProducts && this.allProducts.length > 0) {
      return (this.currentProducts = this.allProducts.filter(
        (v) =>
          v.name
            .toLowerCase()
            .trim()
            .indexOf(searchTerm.toLowerCase().trim()) != -1
      ));
    }
    return;
  }
}
