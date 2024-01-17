<script lang="ts">
	import Footer from '../../components/Footer.svelte';
	import Header from '../../components/Header.svelte';
  import Cookies from 'js-cookie';
  import type cartItem from '../+page.svelte';
  import { onMount } from 'svelte';

  const apiURL = 'http://143.42.222.62:8000';

	async function getSingleProduct(id: string) {
    const res = await fetch(`${apiURL}/products/${id}`)
    const json = await res.json()
    return json
  }

  let products: cartProduct[] = []

  interface cartProduct {
		image_url: string;
		long_description: string;
		name: string;
		price: number;
    quantity: number;
		short_description: string;
		_id: string;
	}

async function checkout() {
  let checkout: { items: cartItem[] } = { items: [] };
  let cart: cartItem[] = JSON.parse(Cookies.get('cart') || '[]');
  let checkout1 = cart.map(item => {
    return {
      product_id: item.productId,
      quantity: item.quantity
    } 
  })
  console.log(checkout1)
  fetch(`${apiURL}/purchase`, {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('access_token')}` ?? ''
        },
        body: JSON.stringify({items: [...checkout1]})
  })
}

 function removeProductFromCart(productId: string | undefined) {
  let cart: cartItem[] = JSON.parse(Cookies.get('cart') || '[]');
    if (cart.length === 1) {
      Cookies.remove('cart');
    }
    cart.forEach((item, index) => {
      if (item.productId === productId) {
        cart.splice(index, 1);
        Cookies.set('cart', JSON.stringify(cart))
      }
    });
    products = products.filter((item) => item._id !== productId);
  }

  async function getProducts() {
  let cart: cartItem[] = JSON.parse(Cookies.get('cart') || '[]');
  const products = cart.map((item) =>
    getSingleProduct(item.productId).then((product) => ({
      image_url: product.image_url,
      long_description: product.long_description,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      short_description: product.short_description,
      _id: product._id,
    }))
  );
  return Promise.all(products);
  }

  function calcTotalPrice(cartItems: cartProduct[]){
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price
    })
    return totalPrice
  }

  onMount(async () => {
		products = await getProducts();
	});
  
</script>

<Header />
<div class="container">
            <h2>CART</h2>
            <p class="cart-description">
                Take a look at what you have in your cart so far and order when
                you feel ready
            </p>
            {#each products as product}
            <div class="item-container">
                <img class="product-image" src={product.image_url} alt="bag" />
                <div class="title-and-price-container">
                    <p>{product.name} x {product.quantity}</p>
                    <p class="product-price">{product.price} USD</p>
                </div>
                <div class="remove-item-container">
                    <button class="trash-button" on:click={() => {removeProductFromCart(product._id)}}>
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
            {/each}
            <div class="checkout-container">
                <p>TOTAL {calcTotalPrice(products)} USD</p>
                <button on:click={checkout} class="checkout-button">GO TO CHECKOUT</button>
            </div>
        </div>

<Footer />

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 24px;
}


.item-container {
    display: flex;
    background-color: #F1F1F1;
    border-radius: 3px;
    justify-content: space-between;
    width: 1000px;
}

.product-image {
    width: 100px;
    padding: 24px;
}

.title-and-price-container {
    align-self: center;
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

.checkout-container {
    display: flex;
    justify-content: space-between;
    width: 1000px;
}

.checkout-button {
    background-color: black;
    color: white;
    border-radius: 5px;
    padding: 8px 16px 8px 16px;
    border-style: none;
}

button:hover {
    cursor: pointer;
}
</style>
