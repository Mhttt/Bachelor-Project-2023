import { Component, Input, OnInit } from '@angular/core';
import CartService from 'src/app/config/cart.service';
import CartItem from 'src/types/CartItem';

@Component({
    selector: 'app-cart-item',
    templateUrl: 'cart-item.component.html',
    styleUrls: ['cart-item.component.css']
})

export class CartItemComponent {

    @Input() item: CartItem;

    constructor(private cartService: CartService) { }

    removeItem() {
        this.cartService.removeFromCart(this.item._id)
    }
}