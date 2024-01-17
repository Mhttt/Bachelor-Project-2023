import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import CartItem from 'src/types/CartItem';
import Cookies from 'js-cookie';
import ProductInterface from 'src/types/ProductInterface';
import LoginService from './login.service';



@Injectable()
export default class CartService {
  public cart = new BehaviorSubject<CartItem[]>([])

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.cart.next(Cookies.get('cart') ? JSON.parse(Cookies.get('cart') as string) : [])
  }

  purchase() {
    if (!this.cart.value.length) {
      alert('Your cart is empty!')
      return
    }

    this.http.post('http://143.42.222.62:8000/purchase', {
      items: this.cart.value.map(item => ({ product_id: item._id, quantity: item.quantity }))
    }, {
      headers: {
        Authorization: `Bearer ${this.loginService.user.value?.token}`
      }
    }).subscribe((res) => {
      this.cart.next([])
      this.updateCookies()

      alert('Thank you for your purchase! :-)')
    })
  }

  addToCart(product: ProductInterface) {
    const item = this.cart.value.find(item => item._id === product._id)

    if (item) {
      item.quantity++
      this.cart.next(this.cart.value)
      this.updateCookies()
      return
    }

    this.cart.next([...this.cart.value, { ...product, quantity: 1 }])
    this.updateCookies()
  }

  removeFromCart(id: string) {
    const item = this.cart.value.find(item => item._id === id)

    if (!item) {
      return
    }

    let items;

    if (item.quantity > 1) {
      item.quantity--
      items = this.cart.value
    }
    else {
      items = this.cart.value.filter(item => item._id !== id)
    }

    this.cart.next(items)
    this.updateCookies()
  }

  private updateCookies() {
    if (this.cart.value.length === 0) {
      Cookies.remove('cart')
      return
    }

    Cookies.set('cart', JSON.stringify(this.cart.value), { expires: 7 })
  }
}

