import { Component, OnInit } from '@angular/core';
import ProductService from '../config/product.service';
import ProductInterface from 'src/types/ProductInterface';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  products: ProductInterface[] = [] 
  searchedProducts: ProductInterface[] = []
  searchText: string = "";
  constructor(public productService: ProductService) {

  }
  ngOnInit() {
    this.productService.getAllProducts().subscribe(response => {
      this.products = response
      this.searchedProducts = response
    })
  }
  
}
