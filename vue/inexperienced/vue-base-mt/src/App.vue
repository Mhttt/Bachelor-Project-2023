<script lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import DiscountHeader from './components/DiscountHeader.vue'
import Cookies from 'js-cookie'

export default {
  components: {
    RouterView,
    PageHeader,
    PageFooter,
    DiscountHeader
  },
  data() {
    return {
      freeshipping: false
    }
  },

  methods: {
    setShippingCookie() {
      if (Math.random() > 0.5) {
        Cookies.set('freeshipping', 'true')
      } else {
        Cookies.set('freeshipping', 'false')
      }
    },
    setFreeShipping() {
      if (Cookies.get('freeshipping') === 'true') {
        this.freeshipping = true
      } else {
        this.freeshipping = false
      }
    }
  },

  created() {
    this.setShippingCookie()
    this.setFreeShipping()
  }
}
</script>

<template>
  <div v-if="freeshipping">
    <DiscountHeader></DiscountHeader>
  </div>
  <PageHeader></PageHeader>
  <RouterView></RouterView>
  <PageFooter></PageFooter>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Inter');
</style>
