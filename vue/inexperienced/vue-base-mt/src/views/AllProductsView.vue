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
      input: '' as string,
      frontpageProducts: [] as Product[]
    }
  },
  methods: {
    async getData() {
      try {
        await fetch('http://143.42.222.62:8000/products').then((res) => {
          res.json().then((data) => (this.frontpageProducts = data))
        })
      } catch (error) {
        console.log('Error: ', error)
      }
    },
  },

  computed: {
    filteredList() {
      return this.frontpageProducts.filter((product) =>
        product.name.toLowerCase().includes(this.input.toLocaleLowerCase())
      )
    }
  },

  created() {
    this.getData()
  }
}
</script>

<template>
  <div class="all-products">
    <h1>ALL PRODUCTS</h1>
    <p class="product-title-description">
      A wide selection of products can be found on our webshop
    </p>

    <div class="searchfield-container">
      <input
        class="searchfield"
        type="text"
        placeholder="Search for a product"
        v-model="input"
      />

      <svg
        class="svg-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M398.9 735.5c-185.4 0-336.3-150.9-336.3-336.3C62.7 213.9 213.5 63 398.9 63s336.2 150.9 336.2 336.2c0.1 185.4-150.8 336.3-336.2 336.3m0-597.8c-144.2 0-261.5 117.3-261.5 261.5s117.4 261.5 261.5 261.5c144.2 0 261.5-117.3 261.5-261.5 0.1-144.2-117.3-261.5-261.5-261.5"
          fill="#C6CCDA"
        />
        <path
          d="M865.9 959.6c-23.9 0-47.8-9.1-66-27.3L540.3 672.6c-14.6-14.6-14.6-38.3 0-52.8 14.6-14.6 38.2-14.6 52.8 0l259.6 259.7c7.4 7.4 19 7.4 26.4 0 3.7-3.7 5.5-8.1 5.5-13.2s-1.9-9.5-5.5-13.2L717.9 691.8c-14.6-14.6-14.6-38.2 0-52.8 14.6-14.6 38.2-14.6 52.8 0l161.2 161.2c17.7 17.7 27.4 41.1 27.4 66s-9.7 48.3-27.4 66c-18.2 18.2-42.1 27.4-66 27.4M249.5 436.6c-20.6 0-37.3-16.7-37.3-37.4 0-103 83.8-186.8 186.8-186.8 20.6 0 37.3 16.7 37.3 37.4 0 20.6-16.7 37.3-37.3 37.3-61.8 0-112.1 50.3-112.1 112.1 0 20.6-16.8 37.4-37.4 37.4"
          fill="#C6CCDA"
        />
      </svg>
    </div>
  </div>
  <div class="outer-product-container">
    <div class="product-container">
      <ProductItem
        v-for="product in filteredList"
        v-bind:key="product.name"
        :productId="product._id"
        :productName="product.name"
        :productPrice="product.price"
        :productUrl="product.image_url"
      >
      </ProductItem>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Inter';
  display: flex;
  flex-direction: column;
  align-items: center;
}

.svg-icon {
  height: 24px;
  margin-right: 8px;
}

.searchfield-container {
  display: flex;
  background-color: #e8e8e8;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 24px;
}

.searchfield {
  background-color: #e8e8e8;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 328px;
  margin-bottom: 60px;
  padding-left: 16px;
}

.searchfield:focus {
  outline: none;
  padding-left: 16px;
}

.all-products {
  display: grid;
  place-items: center;
  margin-top: 80px;
}

.product-title-description {
  font-size: 20px;
  margin-top: 16px;
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
