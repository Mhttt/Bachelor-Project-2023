import { Component, OnInit } from '@angular/core';
import ProductInterface from 'src/types/ProductInterface';
import ProductService from '../config/product.service';

@Component({ selector: 'app-frontpage', templateUrl: 'frontpage.component.html', styleUrls:[ 'frontpage.component.css'] })

export class FrontpageComponent implements OnInit {
    products: ProductInterface[] = []

    constructor(public productService: ProductService) { }

    ngOnInit() {      
        this.productService.getFrontpageProducts().subscribe(response => {
            this.products = response
        })
    }
}