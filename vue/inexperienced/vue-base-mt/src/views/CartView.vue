<template>
  <div class="container">
    <h2>CART</h2>
    <p class="cart-description">
      Take a look at what you have in your cart so far and order when you feel ready
    </p>
    <div v-for="item in cart" :key="item._id" class="item-container">
      <img class="product-image" :src="item.image_url" alt="bag" />
      <div class="title-and-price-container">
        <p>{{ item.quantity }}x {{ item.name }}</p>
        <p class="product-price">
          {{ item.quantity }}x {{ item.price }} USD =
          {{ item.price * (item.quantity ? item.quantity : 1) }} USD
        </p>
      </div>
      <div class="remove-item-container" @click="removeFromCart(item._id)">
        <button class="trash-button">
          <svg class="trash-icon" viewBox="0 0 24 24">
            <path
              d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
            />
          </svg>
        </button>
        <p style="font-size: 15px; margin-bottom: 12px">Remove item</p>
      </div>
    </div>
    <div class="checkout-container">
      <p>TOTAL {{ total }} USD</p>
      <button @click="purchaseItems" class="checkout-button">GO TO CHECKOUT</button>
    </div>
  </div>
</template>

<script lang="ts">
import Cookies from 'js-cookie'
import type { Product } from './ProductView.vue'
import { store } from '../views/RegisterView.vue'

export default {
  data() {
    return {
      cart: [] as Product[],
      total: 0 as number
    }
  },
  created() {
    // Load cart from cookies

    const currentCartCookie = Cookies.get('cart')

    if (currentCartCookie) {
      // There is a cart
      this.cart = JSON.parse(currentCartCookie)

      this.cart.forEach((v, i) => (this.total += v.price * (v.quantity ? v.quantity : 1)))
    } else {
      this.cart = []
      this.total = 0
    }
  },
  methods: {
    async purchaseItems() {
      if (this.cart && this.cart.length > 0 && store.loggedIn) {
        const itemsToPurchase = this.cart.map((v, i) => {
          return {
            product_id: v._id,
            quantity: v.quantity
          }
        })

        if (itemsToPurchase.length > 0) {
          // send purchas request

          const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
              items: itemsToPurchase
            })
          }

          const r = await fetch('http://143.42.222.62:8000/purchase', requestOptions).then(
            (data) => {
              return data.json()
            }
          )

          if (r.purchase_date) {
            Cookies.remove('cart')
            window.location.href = '/checkout'
          } else {
            alert('Error making the purchase')
          }
        } else {
          alert('No items to purchase!')
        }
      } else {
        alert('No items to purchase!')
      }
    },
    async removeFromCart(idToRemove: string) {
      if (this.cart && this.cart.length > 0) {
        const foundItemToRemove = this.cart.findIndex((v, i) => v._id === idToRemove)
        if (foundItemToRemove !== -1) {
          const item = this.cart[foundItemToRemove]
          if (item.quantity && item.quantity > 1) {
            // Just remove one from quanitty
            item.quantity -= 1
          } else {
            // Remove the entire thing
            this.cart.splice(foundItemToRemove, 1)
          }
        }

        Cookies.set('cart', JSON.stringify(this.cart), { expires: 7 })
      }

      if (this.cart.length === 0) {
        // No more items left
        this.cart = []
        this.total = 0
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 40px;
  margin-bottom: 40px;
}

.title-and-description {
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
}

.title-and-description h2 {
  align-self: center;
}

.outer-item-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-container {
  display: flex;
  background-color: rgb(235, 230, 230);
  border-radius: 3px;
  justify-content: space-between;
  width: 1000px;
}

.item-info {
  display: flex;
}

.product-image {
  width: 100px;
  padding: 24px;
}

.title-and-price-container {
  align-self: center;
}

.product-price {
  font-size: 10px;
}

.remove-item-container {
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-top: 16px;
  margin-bottom: 12px;
}

.remove-item-container path {
  fill: black;
}

.trash-icon {
  justify-self: center;
  align-self: center;
  width: 30px;
  height: 30px;
  display: inline;
}

.trash-button {
  background-color: transparent;
  border: none;
}

.price-order-container {
  display: flex;
}

.order-button {
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 8px 16px 8px 16px;
  border-style: none;
}

button:hover {
  cursor: pointer;
}
</style>
