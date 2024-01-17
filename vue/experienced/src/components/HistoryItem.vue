<script lang="ts">

export default {
    props: {
        orderId: String,
        name: String,
        purchaseDate: String,
        total: Number,
        imageUrl: String,
    },
    methods: {
        navigateToOrder() {
            this.$router.push(`/orders/${this.orderId}`)
        }
    }
}


</script>

<template>
    <div class="outer-item-container">
        <div class="item-container">
            <div class="item-info">
                <img class="product-image-history" :src=imageUrl alt="bag" />
                <div class="title-and-price-container">
                    <p>Order #{{ orderId }}</p>
                    <p class="product-price">{{ purchaseDate }}</p>
                </div>
            </div>
            <div class="price-order-container">
                <h3>$ {{ total }} USD</h3>
                <button @click="navigateToOrder">View Order</button>
            </div>
        </div>

    </div>
</template>