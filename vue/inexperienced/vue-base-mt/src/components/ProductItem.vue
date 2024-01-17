<script lang="ts">
export default {
  props: {
    productName: String,
    productPrice: Number,
    productUrl: String,
    productId: String
  }
}
</script>

<template>
  <div class="product">
    <img :src="productUrl" :alt="productName" />
    <RouterLink class="router" :to="'/products/' + productId">
      <button class="product-button">View item</button>
    </RouterLink>
    <p class="product-name">{{ productName }}</p>
    <p class="product-price">{{ productPrice }} USD</p>
  </div>
</template>

<style scoped>
.router {
  position: absolute;
  right: 85%;
}

.product {
  width: 280px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.product-button {
  margin-top: 210px;
  font-size: 20px;
  position: absolute;
  border-radius: 5px;
  background-color: white;
  border: none;
  width: 200px;
  height: 45px;
  z-index: 10;
  transition: background-color 0.2s;
}

.product-button:hover {
  background-color: rgb(67, 66, 66);
}

.product-name {
  font-size: 24px;
  margin-top: 16px;
}

.product-price {
  font-size: 20px;
}
</style>
