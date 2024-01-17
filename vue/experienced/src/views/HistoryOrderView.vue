<script setup lang="ts">
import { getProduct } from '@/api/getProduct';
import { getOrderById } from '@/api/orders';
import HistoryOrderItem from '@/components/HistoryOrderItem.vue';

</script>


<script lang="ts">

export default {
    data() {
        return {
            orderFromOrderId: []
        };
    },
    async created() {
        this.orderFromOrderId = await getOrderById(this.$route.params.id as string)
        console.log(this.orderFromOrderId)
    },
    methods: {
        goBack() {
            this.$router.push("/orders")
        },
        async getImageByProductId(productId: string) {
            const response = await (getProduct(productId))
            return response.image_url;

        },
        getTotal(items) {
            let total = 0;
            items.forEach((item) => {
                total += (item.price * item.quantity)
            })
            return total;
        }
    }
};

</script>

<template>
    <div class="container">
        <div class="title-and-description">
            <h2>HISTORY - ORDER #{{ orderFromOrderId._id }}</h2>
            <p>
                List of all items purchased on {{ orderFromOrderId.purchase_date.split(".")[0] }} with order ID
                #{{ orderFromOrderId._id }}.
            </p>
        </div>
        <div class="outer-item-container">
            <button @click="goBack"> &lt;- Go back</button>
            <template v-for="(item, index) in orderFromOrderId.items" :key="index">

                <HistoryOrderItem :productName=item.name :quantity=item.quantity :price=item.price
                    :imageUrl=orderFromOrderId.image_url />

            </template>
            <p class="total">TOTAL {{ getTotal(orderFromOrderId.items) }} USD</p>
        </div>


    </div>
</template>

<style>
.product-price {
    margin-top: 20px;
}

.product-price {
    font-size: 16px;
}


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

.outer-item-container button {
    background-color: black;
    color: white;
    border-radius: 5px;
    border-style: none;
    padding: 8px 24px 8px 24px;
    max-width: 20%;
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


button:hover {
    cursor: pointer;
}
</style>
