// Covert current cookie to list

import Cookies from 'js-cookie'
import store from './store';

export function init(){
  const cookieCart = getCart()
  store.commit('setCart', cookieCart)
}

export function removeCart() {
    Cookies.remove('cart');
}

export function getCart() {

  return Cookies.get('cart') === undefined ? [] : JSON.parse(Cookies.get('cart'))

}

export function addToCart(cartObject) {
  const products = getCart()

  const item = products.find(item => item._id === cartObject._id)

  if (item) {
    item.quantity++
    console.log(products)
    console.log(item.quantity)
    updateCookies(products)
    return
  }

  products.push(cartObject)
  updateCookies(products)
  store.commit('setCart', products)
}

export function removeItemFromCart(id: string) {
  const cart = getCart()
  console.log(cart)
  console.log(id)
  const item = cart.find(item => item._id === id)

  if (!item) {
    return
  }

  let items;

  if (item.quantity > 1) {
    item.quantity--
    items = cart
  }
  else {
    items = cart.filter(item => item._id !== id)
  }

  store.commit('setCart', items)
  updateCookies(items)
}

export function updateCookies(cart) {

  if (cart.length === 0) {
    Cookies.remove('cart')
    return
  }

  Cookies.set('cart', JSON.stringify(cart), { expires: 7 })
}
