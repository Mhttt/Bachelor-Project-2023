import { Component, For, Show, createEffect, createResource, createSignal } from 'solid-js';
import styles from './CartPage.module.css';
import Cookies from 'js-cookie';
import { IResultItem } from '../FrontPage/FrontPage';
import { A } from '@solidjs/router';

const CartPage: Component = () => {
  function getProductInCart(): IResultItem[] {
    const cartCookie = Cookies.get('cart');

    if (cartCookie) {
      const cart: [IResultItem] = JSON.parse(cartCookie);
      console.log(cart);
      return cart;
    } else {
      return [];
    }
  }

  function removeItem(productId: string) {
    const cartCookie = Cookies.get('cart');

    if (cartCookie) {
      const cart: [IResultItem] = JSON.parse(cartCookie);

      const foundItem = cart.findIndex((v, i) => v._id === productId);

      if (foundItem !== -1) {
        if (cart[foundItem].quantity! <= 1) {
          cart.splice(foundItem, 1);
        } else {
          cart[foundItem].quantity! -= 1;
        }

        Cookies.set('cart', JSON.stringify(cart));
        setProducts(getProductInCart());
        return alert('Successfully removed');
      }
      return alert('Item not found');
    } else {
      return alert('Error finding cart');
    }
  }

  const [products, setProducts] = createSignal<IResultItem[]>(getProductInCart());
  const [productsTotal, setProductsTotal] = createSignal(0);

  createEffect(() => {
    let total = 0;
    products().forEach((v, i) => (total += (v.quantity ? v.quantity : 1) * v.price));
    setProductsTotal(total);
  });

  return (
    <div class={styles.container}>
      <h2>CART</h2>
      <p class={styles['cart-description']}>
        Take a look at what you have in your cart so far and order when you feel ready
      </p>

      <Show when={products().length > 0} fallback={<>Loading... </>}>
        <For each={products()}>
          {(item) => (
            <div class={styles['item-container']}>
              <img class={styles['product-image']} src={item.image_url} alt="bag" />
              <div class={styles['title-and-price-container']}>
                <p>
                  {item.quantity}x {item.name}
                </p>
                <p class={styles['product-price']}>
                  {item.quantity}x {item.price} USD
                </p>
              </div>
              <div onClick={() => removeItem(item._id)} class={styles['remove-item-container']}>
                <button class={styles['trash-button']}>
                  <svg class={styles['trash-icon']} viewBox="0 0 24 24">
                    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                  </svg>
                </button>
                <p style="font-size: 15px; margin-bottom: 12px">Remove item</p>
              </div>
            </div>
          )}
        </For>
      </Show>

      <div class={styles['checkout-container']}>
        <p>TOTAL {productsTotal()} USD</p>
        <button class={styles['checkout-button']}>
          <A href="/checkout">GO TO CHECKOUT</A>
        </button>
      </div>
    </div>
  );
};

export default CartPage;
