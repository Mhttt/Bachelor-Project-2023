
<script lang="ts">

export default {
    props: {
        imageUrl: String,
        productName: String,
        price: Number,
        quantity: Number
    }
}
</script>

<template>
    <div class="item-container">
        <div class="item-info">
            <img class="product-image-history" :src=imageUrl alt="bag" />
            <div class="title-and-price-container">
                <p>{{ productName }} x{{ quantity }}</p>
                <p class="product-price">{{ price }} ({{ +price * +quantity }}) USD</p>
            </div>
        </div>
    </div>
</template>