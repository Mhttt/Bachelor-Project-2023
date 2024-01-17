<script setup lang="ts">
import ProductItem from "@/components/ProductItem.vue";
import type { ProductItemType } from "../types";
import { getProducts } from "@/api/getProducts";
</script>

<script lang="ts">
export default {
    data() {
        return {
            products: [] as ProductItemType[]
        }
    },
    async created() {
        this.products = await getProducts(6);
    },
    methods: {
        viewAllProducts() {
            this.$router.push("/products");
        }
    }
}
</script>

<template>
    <main>

        <div class="image-container">
            <img class="image" src="@/assets/FrontView/bag_image_frontpage.png" alt="frontpage image" />
        </div>

        <div class="product-info">
            <h1>BRAND NEW PRODUCTS</h1>

            <p class="product-title-description">
                A wide selection of products can be found on our webshop
            </p>
        </div>

        <div class="product-container">
            <template v-for="(item, index) in products" :key="index">
                <ProductItem :id="item._id" :image_url="item.image_url" :name="item.name" :price="item.price" />
            </template>

        </div>

        <button class="view-all-btn" @click="viewAllProducts">View All Items</button>
    </main>
</template>


<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    margin-bottom: 0px;
    font-weight: bold;
}

.image {
    justify-content: center;
    width: 1000px;
    height: auto;
}

.image-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

.product-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
}

.product-title {
    font-size: 36px;
}

.product-title-description {
    font-size: 20px;
    margin-top: 16px;
    margin-bottom: 16px;
}

.product-container button {
    margin-top: 210px;
    font-size: 20px;
    position: absolute;
    border-radius: 5px;
    background-color: white;
    border: none;
    width: 200px;
    height: 45px;
}

.product-container button:hover {
    cursor: pointer;
    background-color: darkgrey;
}

.product-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    width: 1000px;
    grid-row-gap: 16px;
    margin-bottom: 32px;
}

.view-all-btn {
    margin-bottom: 32px;
    color: white;
    background-color: black;
    border-radius: 5px;
    border-style: none;
    padding: 10px 100px 10px 100px;
}

button:hover {
    cursor: pointer;
    background-color: #1a1918;
}
</style>