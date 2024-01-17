<script lang="ts">
import store from '../api/store';
import {getCart, removeItemFromCart} from '../api/cookie';

export default {
    props: {
        imageUrl: String,
        price: Number,
        bagName: String,
        quantity: Number,
        _id: String
    },
    methods: {
        removeItemFromCart() {
            const id: string = this._id as string
            removeItemFromCart(id)
        }
    }
}
</script>


<template>
            <div class="item-container">
                <img class="product-image-cart" :src=imageUrl alt="bag" />
                <div class="title-and-price-container">
                    <p>{{ bagName }} x{{ quantity }}</p>
                    <p class="product-price">{{ price }} ({{ (+price * +quantity) }}) USD</p>
                </div>
                <div class="remove-item-container">
                    <button @click="removeItemFromCart" class="trash-button">
                        <svg class="trash-icon" viewBox="0 0 24 24">
                            <path
                                d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                            />
                        </svg>
                    </button>
                    <p style="font-size: 15px; margin-bottom: 12px">
                        Remove item
                    </p>
                </div>
            </div>

</template>


<style>

.product-image-cart {
    width: 100px;
    padding: 24px;
}

.item-container {
    display: flex;
    background-color: rgb(235, 230, 230);
    border-radius: 3px;
    justify-content: space-between;
    width: 1000px;
}


.product-price {
    font-size: 10px;
}

.remove-item-container {
    display: flex;
    flex-direction: column;
    padding-right: 16px;
    padding-top: 16px;
    margin-bottom: 12px;
}

.remove-item-container path {
    fill: black;
}

.trash-icon {
    justify-self: center;
    align-self: center;
    width: 30px;
    height: 30px;
    display: inline;
}

.trash-button {
    background-color: transparent;
    border: none;
}

</style>