import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FrontView from '../views/FrontView.vue'
import AllProductsView from '../views/AllProductsView.vue'
import ProductView from '../views/ProductView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import CartView from '../views/CartView.vue';
import HistoryOrderView from '../views/HistoryOrderView.vue';
import HistoryView from '../views/HistoryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FrontView
    },
    {
      path: '/products',
      name: 'All Products',
      component: AllProductsView
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: ProductView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: CheckoutView
    },
    {
      path: '/cart',
      name:'Cart',
      component: CartView
    },
    {
      path: '/orders/:id',
      name: 'Order',
      component: HistoryOrderView
    },
    {
      path: '/orders',
      name: 'Orders',
      component: HistoryView
    }
  ]
})

export default router
