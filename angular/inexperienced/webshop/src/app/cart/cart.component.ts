import { Component, OnInit } from '@angular/core';
import CartService from '../config/cart.service';
import CartItem from 'src/types/CartItem';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css']
})

export class CartComponent implements OnInit {
    items: CartItem[] = []
    total: number = 0

    constructor(public cartService: CartService) { }

    ngOnInit() {
        this.cartService.cart.subscribe(next => {
            this.items = next
            this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        });
    }

    purchase() {
        this.cartService.purchase()
    }
}