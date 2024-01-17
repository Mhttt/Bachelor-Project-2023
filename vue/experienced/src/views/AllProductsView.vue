<script setup lang="ts">
import ProductItem from "@/components/ProductItem.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import type { ProductItemType } from "../types";
import { getProducts } from "@/api/getProducts";
</script>

<script lang="ts">
export default {

    data() {
        return {
            products: [] as ProductItemType[],
            displayProducts: [] as ProductItemType[],
            search: ""
        }
    },
    async created() {
        this.products = await getProducts();
        this.displayProducts = this.products;
    },
    watch: {
        search() {
            this.displayProducts = this.products.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    }
}
</script>

<template>
    <main>

        <div class="all-products">
            <h1>ALL PRODUCTS</h1>
            <p class="product-title-description">
                A wide selection of products can be found on our webshop
            </p>

            <div class="searchfield-container">
                <input class="searchfield" type="text" placeholder="Search for a product" v-model="search" />

                <IconSearch />
            </div>
        </div>


        <div class="product-container">
            <template v-for="(item, index) in displayProducts" :key="index">
                <ProductItem :id="item._id" :image_url="item.image_url" :name="item.name" :price="item.price" />
            </template>

        </div>

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

.product-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    width: 1000px;
    grid-row-gap: 16px;
    margin-bottom: 32px;
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
}

.product-title-description {
    font-size: 20px;
    margin-top: 16px;
    margin-bottom: 16px;
}
</style>