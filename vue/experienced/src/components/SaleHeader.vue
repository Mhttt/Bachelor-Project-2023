<script setup lang="ts">
import IconProfile from './icons/IconProfile.vue';
import IconCart from './icons/IconCart.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            isSale: false
        }
    },
    created() {
        if (!document.cookie) {
            console.log("creating cookie..")
            document.cookie = "isSale=" + (Math.floor(Math.random() * 2) === 0);
        }
        console.log(document.cookie.split("=")[1])
        this.isSale = document.cookie.split("=")[1] === "true";
    },
    methods: {
        toHomePage() {
            this.$router.push("/");
        },
        toRegisterPage() {
            this.$router.push("/register");
        },
    }
}
</script>


<template>
    <header v-if="isSale">
        <h2 class="white-text shop-title" @click="toHomePage">
            CONGRATULATIONS! YOU GOT FREE SHIPPING.
        </h2>
    </header>
</template>


<style scoped>
header {
    height: 50px;
    background-color: #CE9898;
}

.white-text {
    color: #000000;
    font-size: 16px;
    text-align: center;
    width: 100%;
    line-height: 50px;
}
</style>