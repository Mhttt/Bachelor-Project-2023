<script lang="ts">
import { getMyOrders } from '@/api/orders';

export default {
    data() {
        return {
            history: [],
            imageUrl: "test"
        };
    },
    async created() {
        const orders = await getMyOrders();
        console.log(orders)
        this.history = orders
    },
    methods: {
        calculateTotal(products) {
            let total = 0;
            console.log(products)
            products?.forEach((item) => {
                total += (item.quantity * item.price)
            })
            
            return total;
        },
        getDate(date){
            return date.split(".")[0]
        }
    }
}
</script>

<script setup lang="ts">
import HistoryItem from '../components/HistoryItem.vue'

</script>
<template>
    <div class="container">
        <div class="title-and-description">
            <h2>HISTORY</h2>
            <p>Track your order history and view your latest purchases</p>
        </div>
        <template v-for="(item, index) in history" :key="index">
            <HistoryItem :imageUrl=item.image_url :orderId="item._id" :total=calculateTotal(item.items)
                :purchaseDate=getDate(item.purchase_date) />
        </template>

    </div>
</template>



<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-bottom: 30px;
}

.title-and-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
}

.title-and-description h2 {
    align-self: center;
}

.outer-item-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.item-container {
    display: flex;
    background-color: rgb(235, 230, 230);
    border-radius: 3px;
    justify-content: space-between;
    width: 1000px;
}

.item-info {
    display: flex;
}

.product-image-history {
    width: 100px;
    padding: 24px;
}

.title-and-price-container {
    align-self: center;
}

.product-price {
    font-size: 10px;
}

.price-order-container {
    display: flex;
    gap: 24px;
    align-items: center;
    padding-right: 32px;
}

.price-order-container button {
    background-color: black;
    color: white;
    border-radius: 5px;
    border-style: none;
    padding: 8px 24px 8px 24px;
    max-height: 50%;
    margin-left: 50px;

}

button:hover {
    cursor: pointer;
}
</style>