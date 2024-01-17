<template>
  <div class="container">
    <div class="title-and-description">
      <h2>HISTORY</h2>
      <p>Track your order history and view your latest purchases</p>
    </div>
    <div class="outer-item-container">
      <div v-for="order in products" :key="order._id" class="item-container">
        <div class="item-info">
          <img class="product-image" :src="order.image_url" alt="bag" />
          <div class="title-and-price-container">
            <p>Order #{{ order._id }}</p>
            <p class="product-price">{{ order.purchase_date }}</p>
          </div>
        </div>
        <div class="price-order-container">
          <h3>$ 125 USD</h3>
          <button class="test">View Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from './ProductView.vue'

export default {
  data() {
    return {
      products: [] as {
        _id: string
        user_id: string
        image_url: string
        purchase_date: Date
        items: Product[]
      }[]
    }
  },
  created() {
    this.getOrderHistory()
  },
  methods: {
    async getOrderHistory() {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      const r = await fetch('http://143.42.222.62:8000/purchases', requestOptions).then((data) => {
        return data.json()
      })

      if (r && r.length > 0) {
        this.products = r
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-bottom: 30px;
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

.price-order-container {
  display: flex;
  gap: 24px;
  align-items: center;
  padding-right: 32px;
}

.price-order-container button {
  background-color: black;
  color: white;
  border-radius: 5px;
  border-style: none;
  padding: 8px 24px 8px 24px;
  max-height: 50%;
}

button:hover {
  cursor: pointer;
}
</style>
