<script lang="ts">
import ProductItem from '../components/ProductItem.vue'

interface Product {
  _id: string
  name: string
  short_description: string
  long_description: string
  price: number
  image_url: string
}

export default {
  components: {
    ProductItem
  },

  data() {
    return {
      frontpageProducts: [] as Product[]
    }
  },

  methods: {
    async getData() {
      try {
        await fetch('http://143.42.222.62:8000/products?limit=6').then((res) => {
          res.json().then((data) => (this.frontpageProducts = data))
        })
      } catch (error) {
        console.log('Error: ', error)
      }
    }
  },

  created() {
    this.getData()
  }
}

</script>

<template>
  <div class="image-container">
    <img class="image" src="../assets/bag_image_frontpage.png" alt="frontpage image" />
  </div>

  <div class="product-info">
    <h1>BRAND NEW PRODUCTS</h1>

    <p class="product-title-description">
      A wide selection of products can be found on our webshop
    </p>
  </div>
  <div class="outer-product-container">
    <div class="product-container">
      <ProductItem
        v-for="product in frontpageProducts"
        v-bind:key="product.name"
        :productId="product._id"
        :productName="product.name"
        :productPrice="product.price"
        :productUrl="product.image_url"
      >
      </ProductItem>
    </div>
  </div>
  <div class="button-container">
    <RouterLink to="/all-products">
      <button>View All Products</button>
    </RouterLink>
  </div>
</template>

<style scoped>
body {
  font-family: 'Inter';
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image {
  justify-content: center;
  width: 1300px;
  height: auto;
}

.image-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
}

.product-title {
  font-size: 36px;
}

.product-title-description {
  font-size: 20px;
  margin-bottom: 16px;
}

.product-description {
  font-size: 24px;
  margin-top: 16px;
}

.product-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  width: 1000px;
  grid-row-gap: 16px;
  margin-bottom: 72px;
}

.outer-product-container {
  display: flex;
  justify-content: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.button-container button {
  margin-top: 30px;
  color: white;
  background-color: black;
  border-radius: 5px;
  border-style: none;
  padding: 10px 100px 10px 100px;
}
</style>
