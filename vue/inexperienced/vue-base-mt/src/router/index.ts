import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AllProductsView from '@/views/AllProductsView.vue'
import ProductView from '@/views/ProductView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import CartViewVue from '@/views/CartView.vue'
import CheckoutViewVue from '@/views/CheckoutView.vue'
import PurchaseHistoryView from '@/views/PurchaseHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/all-products',
      name: 'about',
      component: AllProductsView
    },
    { path: '/products/:id', name: 'product', component: ProductView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/login', name: 'Login', component: LoginViewVue },
    { path: '/cart', name: 'Cart', component: CartViewVue },
    { path: '/checkout', name: 'Checkout', component: CheckoutViewVue },
    { path: '/history', name: 'History', component: PurchaseHistoryView }
  ]
})

export default router
