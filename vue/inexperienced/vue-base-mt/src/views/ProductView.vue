<script lang="ts">
import Cookies from 'js-cookie'
import { store } from '../views/RegisterView.vue'

export interface Product {
  _id: string
  name: string
  short_description: string
  long_description: string
  price: number
  image_url: string
  quantity?: number
}

export interface Review {
  _id: string
  timestamp: Date
  rating: number
  rater: string
  product_id: string
  comment: string
}

export default {
  data() {
    return {
      product: {} as Product,
      store,
      reviews: [] as Review[],
      comment: '',
      stars: ''
    }
  },

  methods: {
    async getData() {
      try {
        const url = new URL(window.location.href)
        const productID = url.pathname.split('/')[2]
        await fetch('http://143.42.222.62:8000/products/' + productID).then((res) => {
          res.json().then((data) => (this.product = data))
        })
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async getReviews() {
      try {
        const url = new URL(window.location.href)
        const productID = url.pathname.split('/')[2]
        const r = await fetch('http://143.42.222.62:8000/products/reviews/' + productID).then(
          (res) => {
            return res.json()
          }
        )
        this.reviews = r
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async addReview() {
      const url = new URL(window.location.href)
      const productID = url.pathname.split('/')[2]
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          comment: this.comment,
          rating: parseInt(this.stars),
          product_id: productID
        })
      }

      const r = await fetch('http://143.42.222.62:8000/products/reviews/add', requestOptions).then(
        (data) => {
          return data.json()
        }
      )

      if (r.rater) {
        this.getReviews()
      }
    },
    async addToCart() {
      // Check if cookie already exists
      const cartcookie = Cookies.get('cart')

      if (cartcookie) {
        // Cookie already exists
        const currentCart: Product[] = JSON.parse(cartcookie)

        const productInCart = currentCart.findIndex((v, i) => v._id === this.product._id)

        if (productInCart !== -1) {
          // Product exists in card
          if (currentCart[productInCart].quantity) {
            currentCart[productInCart].quantity! += 1
          }
        } else {
          // product doesnt not exists just add it
          currentCart.push({ ...this.product, quantity: 1 })
        }

        Cookies.set('cart', JSON.stringify(currentCart), { expires: 7 })
      } else {
        // cookie does not exist create it
        Cookies.set('cart', JSON.stringify([{ ...this.product, quantity: 1 }]), { expires: 7 })
      }

      alert('Added to cart!')
    }
  },
  created() {
    this.getData()
    this.getReviews()
  }
}
</script>

<template>
  <div v class="product">
    <div class="product-image">
      <img :src="product.image_url" alt="Product Image" />
    </div>

    <div class="product-info" v-if="product">
      <h3>{{ product.name }}</h3>
      <p>The warmest bag you will ever find.</p>

      <h2>{{ product.price }} USD</h2>
      <button @click="addToCart()" class="product-item-buttons">Add to Cart</button>

      <h4>Description</h4>
      <p>
        {{ product.long_description }}
      </p>
    </div>
  </div>
  <div class="bigReviewContainer">
    <!-- Reviews -->
    <h1>Product Reviews</h1>

    <div class="reviews">
      <div v-for="review in reviews" :key="review._id" class="review">
        <div class="stars">
          <svg v-for="n in review.rating" :key="n" width="24" height="24" viewBox="0 0 24 24">
            <path
              class="star"
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
            />
          </svg>
        </div>

        <p>“{{ review.comment }}” - {{ review.rater }}</p>
      </div>
    </div>

    <div v-if="store.loggedIn == true">
      <!-- Leave a review -->
      <h1>Leave a Review</h1>

      <section class="user-input">
        <select v-model="stars" class="input-stars">
          <option value="">-- Please choose an option --</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <textarea
          v-model="comment"
          class="input-feedback"
          placeholder="Write what you think about the product"
        ></textarea>

        <button @click="addReview()" class="product-item-buttons">Submit Review</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding-top: 72px;
  margin-bottom: 56px;
  justify-content: center;
}

.product-info {
  flex-grow: 0;
  width: 350px;
}

.product-image {
  flex-grow: 0;
  width: 650px;
}

.product-info > h3 {
  font-size: 32px;
}

.product-info > h2 {
  font-size: 40px;
  font-weight: unset;
}

.product-info > h4 {
  margin-bottom: 8px;
}

.product-item-buttons {
  width: 350px;
  height: 40px;
  border: none;
  background-color: #1f1f1f;
  color: white;
  cursor: pointer;

  margin-top: 16px;
  margin-bottom: 16px;
}

.product-item-buttons:hover {
  background-color: #2f2f2f;
}

/* Review */

.bigReviewContainer {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}
.reviews {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review {
  padding: 32px;
  background-color: #fbfbfb;
}

.stars {
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-bottom: 8px;
}

.star {
  fill: #616161;
}

.user-input {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 56px;
}

.user-input > select {
  height: 50px;
  width: 300px;
  background-color: #fbfbfb;
  border: none;
  padding-left: 16px;
}

.user-input > select:focus {
  outline: none;
}

.user-input > textarea {
  border: none;
  resize: none;
  background-color: #fbfbfb;
  padding: 16px;
}

.user-input > textarea:focus {
  outline: none;
}

.user-input > button {
  margin-top: 8px;
  width: 200px;
}
</style>
