<script setup lang="ts">
import { getProduct } from '@/api/getProduct';
import { getReviews } from '@/api/getReviews'
import { postReview } from '@/api/postReview'
import type { ProductItemType } from "../types";
import type { ReviewType } from "../types"
import Review from '@/components/Review.vue'
import store from '../api/store'
import { addToCart } from '@/api/cookie';


</script>

<script lang="ts">


export default {

  data() {
    return {
      product: undefined as ProductItemType | undefined,
      ratings: undefined as ReviewType[] | undefined,
      user_comment: '',
      user_rating: 0
    }
  },
  async created() {
    this.product = await getProduct(this.$route.params.id as string)
    this.ratings = await getReviews(this.$route.params.id as string)
  },
  methods: {
    viewAllProducts() {
      this.$router.push("/products");
    },
    async submitReview(){
      const review_obj = {
        "comment": this.user_comment,
        "product_id": this.$route.params.id as string,
        "rating": this.user_rating,
      };

      // TODO: Automatic refresh and add response cases
      const response = await postReview(review_obj);
      alert("You have successfully added a review!")
    },
    addProductToCart() {
      const cartObject = {
        "_id": this.product?._id,
        "bagName": this.product?.name,
        "price": this.product?.price,
        "imageUrl": this.product?.image_url,
        "quantity": 1
      };
      addToCart(cartObject)
      alert(`Product ${this.product?.name} has been added to the cart`)
    }
  },

}
</script>

<template>
  <main>
    <!-- Product Information -->
    <div class="product">
      <div class="product-image">
        <img :src="product?.image_url" alt="Product Image" />
      </div>

      <div class="product-info">
        <h3>{{ product?.name }}</h3>
        <p class="short">{{ product?.short_description }}</p>

        <h2>{{ product?.price }} USD</h2>
        <button @click="addProductToCart" class="product-item-buttons">Add to Cart</button>

        <h4>Description</h4>
        <p>
          {{ product?.long_description }}
        </p>
      </div>
    </div>
            <!-- Reviews -->
            <h1>Product Reviews</h1>

            <div class="reviews">

              
              <template v-for="(item, index) in ratings" :key="index">
                <Review :comment="item.comment" :rating="item.rating"/>
              </template>
              
            </div>

            <template v-if="store.state.loggedIn === true">
            <!-- Leave a review -->
            <h1>Leave a Review</h1>

            <section class="user-input">
                <select v-model.number="user_rating" class="input-stars">
                    <option value="">-- Please choose an option --</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>

                <textarea
                    class="input-feedback"
                    v-model="user_comment"
                    placeholder="Write what you think about the product"
                ></textarea>

                <button @click="submitReview" class="product-item-buttons">Submit Review</button>
            </section>
          </template>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
}


img {
  width: 650px;
  height: 650px;
}

h3,
h4 {
  font-weight: bold;
}

.short {
  margin-top: 16px;
  margin-bottom: 16px;
}

/* Product Information */
.product {
  display: flex;
  flex-direction: row;
  gap: 40px;
}

.product-info {
  flex-grow: 0;
  width: 350px;
}

.product-image {
  flex-grow: 0;
  flex-shrink: 0;
}

.product-info>h3 {
  font-size: 32px;
}

.product-info>h2 {
  font-size: 40px;
  font-weight: unset;
}

.product-info>h4 {
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
