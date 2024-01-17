<script setup lang="ts">
import Header from './components/Header.vue'
import SaleHeader from './components/SaleHeader.vue'

import Footer from './components/Footer.vue'

</script>

<template>
  <div class="main">
    <SaleHeader />
    <Header />
    <div class="main-item">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Inter");

* {
  font-family: "Inter";
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-item {
  flex: 1;
}
</style>