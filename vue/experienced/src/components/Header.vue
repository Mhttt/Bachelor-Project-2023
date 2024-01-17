<script setup lang="ts">
import IconProfile from './icons/IconProfile.vue';
import IconCart from './icons/IconCart.vue';
import store from '../api/store'
import { computed } from 'vue';


const loggedIn = computed(() => store.state.loggedIn)


</script>

<script lang="ts">
export default {
    data() {
        return {
            label: store.state.label,
            loggedIn: store.state.loggedIn
        }
    },

    methods: {
        toHomePage() {
            this.$router.push("/");
        }
    }
    }

</script>

<template>
    <header>
        <div class="text-icon">
            <button class="svg-button">
                <IconProfile />
            </button>
            <div v-if="loggedIn">
                <RouterLink to="/">
                    <p class="white-text">{{ store.state.label }}</p>
                </RouterLink>
            </div>
            <div v-else>
                <RouterLink to="/register">
                    <p class="white-text"> Register </p>
                </RouterLink>
                <div>
                <RouterLink to="/login">
                    <p class="white-text"> Login </p>
                </RouterLink>
            </div>
            </div>
            
        </div>
        <h2 class="white-text shop-title" style="padding-right: 60px" @click="toHomePage">
            WEBSHOP
        </h2>
        <div class="text-icon">
            <button class="svg-button">
                <IconCart />
            </button>
            <p class="white-text">Cart</p>
        </div>
    </header>
</template>


<style scoped>
body {
    font-family: "Inter";
    padding-top: 100px;
    padding-right: 40px;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: black;
    margin-bottom: 32px;
}

p {
    cursor: pointer
}

.shop-title {
    align-self: center;
    cursor: pointer;
}

.text-icon {
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
}

.white-text {
    color: white;
    padding-left: 10px;
    font-size: 22px;
}

.svg-button {
    background-color: transparent;
    border-style: none;
}
</style>