<script lang="ts">
	import Footer from '../../components/Footer.svelte';
	import Header from '../../components/Header.svelte';
  import type {cartProduct, PurchaseOrder, ProductInfo} from '../+page.svelte';
  import Cookies from 'js-cookie';
  import { onMount } from 'svelte';

	const apiURL = 'http://143.42.222.62:8000';

  
  let purchases: PurchaseOrder[] = []

	async function getPurchaseHistory() {
      let response = await fetch(`${apiURL}/purchases`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('access_token')}` ?? ''
        },
    })
    const purchases = await response.json()
    return Promise.all(purchases)
  }

  onMount(async () => {
		purchases = await getPurchaseHistory();
	});

  function totalPrice(items: ProductInfo[]) {
    let total = 0;
    items.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }
</script>

<Header />
 <div class="container">
            <div class="title-and-description">
                <h2>HISTORY</h2>
                <p>Track your order history and view your latest purchases</p>
            </div>
            <div class="outer-item-container">
              {#each purchases as purchase}
                <div class="item-container">
                    <div class="item-info">
                        <img
                            class="product-image"
                            src={purchase.image_url}
                            alt="bag"
                        />
                        <div class="title-and-price-container">
                            <p>Order #{purchase._id}</p>
                            <p class="product-price">{purchase.purchase_date}</p>
                        </div>
                    </div>
                    <div class="price-order-container">
                        <h3>$ {totalPrice(purchase.items)} USD</h3>
                        <a href={`/purchase/${purchase._id}`} class="test">View Order</a>
                    </div>
                </div>
                {/each}
            </div>
        </div>

<Footer />

<style>
	.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-bottom: 30px;
}

.title-and-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
    margin-top: 16px;
    gap: 8px;
}

.title-and-description h2 {
    align-self: center;
    font-size: 24px;
}

.outer-item-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.item-container {
    display: flex;
    background-color: rgb(235, 230, 230);
    border-radius: 3px;
    justify-content: space-between;
    width: 1000px;
}

.item-info {
    display: flex;
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

.price-order-container {
    display: flex;
    gap: 24px;
    align-items: center;
    padding-right: 32px;
}

.price-order-container a {
    background-color: black;
    color: white;
    border-radius: 5px;
    border-style: none;
    padding: 8px 24px 8px 24px;
    max-height: 50%;
}

</style>
