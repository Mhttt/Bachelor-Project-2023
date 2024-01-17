import type { CartItemType } from '@/types';
import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
    state () {
      return {
        loggedIn: false,
        label: 'Register',
        cart: [] as CartItemType[]
      }
    },
    mutations: {
      updateLoginState(state, newState) {
        state.loggedIn = newState;
      },
      updateLabel(state, newLabel) {
        state.label = newLabel  
      },
      addItemToCart(state, item) {
        state.cart.push(item);
      },
      removeItemFromCart(state, bagName) {
        state.cart.forEach((product, index) => {
            if(product.bagName === bagName) state.cart.splice(index, 1);
        })
      },
      setCart(state, cartCookie){
        state.cart = cartCookie;
      }
    }
  })