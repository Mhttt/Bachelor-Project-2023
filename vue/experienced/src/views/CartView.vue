<script setup lang="ts">
import { init } from '@/api/cookie';
import store from '../api/store';
import CartItem from '@/components/CartItem.vue';
import { computed } from 'vue';


init()
const cart = computed(() => store.state.cart)
const total = computed(() => cart.value.reduce((sum, item) => sum + ((item.price as number) * (item.quantity as number)), 0))

</script>

<script lang="ts">

export default {
    data(){
        return {
            cart: this.cart
        }
    },
  methods: {
        toCheckout() {
            this.$router.push("/checkout");
        }
    }  
}


</script>


<template>
    <template v-if="cart.length === 0">
        <h1 style="justify-content: center; align-item: center;">
            You have not items in your cart!
        </h1>

    </template>

    <template v-else>

        <!--HEADER END -->
        <div class="container">
            <h2>CART</h2>
            <p class="cart-description">
                Take a look at what you have in your cart so far and order when
                you feel ready
            </p>

            <template v-for="(item, index) in cart" :key="index">
                <CartItem :_id="item._id" :quantity="item.quantity" :bagName="item.bagName" :price="item.price" :imageUrl=item.imageUrl />
            </template>

            <div class="checkout-container">
                <p>TOTAL {{ total }} USD</p>
                <button @click="toCheckout" class="checkout-button">GO TO CHECKOUT</button>
            </div>
        </div>
    </template>
</template>
<style></style>