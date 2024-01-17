<script lang="ts">
export default {
    props: {
        id: String,
        name: String,
        price: Number,
        image_url: String,
    },
    methods: {
        viewItem() {
            this.$router.push(`/product/${this.id}`);
        }
    }
}
</script>

<template>
    <div class="product">
        <img :src="image_url" alt="bag image" />
        <p class="product-name">{{ name }}</p>
        <p class="product-price">{{ price }} USD</p>
        
        <button @click="viewItem">View item</button>
    </div>
</template>


<style scoped>
img {
    width: 100%
}

.product-name {
    font-size: 24px;
    margin-top: 16px;
    margin-bottom: 8px;
}

.product-price {
    font-size: 20px;
}

.product {
    width: 280px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

button {
    margin-top: 210px;
    font-size: 20px;
    position: absolute;
    border-radius: 5px;
    background-color: white;
    border: none;
    width: 200px;
    height: 45px;
}

button:hover {
    cursor: pointer;
    background-color: darkgrey;
}
</style>