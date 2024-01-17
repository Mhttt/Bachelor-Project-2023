<script context="module" lang="ts">
	export interface Product {
		image_url: string;
		long_description: string;
		name: string;
		price: number;
		short_description: string;
		_id: string;
	}

  export interface Review {
		_id: string;
		comment: string;
		product_id: string;
		rating: number;
		rater: string;
    timestamp: string;
	}

  export interface cartProduct {
		image_url: string;
		long_description: string;
		name: string;
		price: number;
    quantity: number;
		short_description: string;
		_id: string;
	}

  export interface cartItem {
  productId: string;
  quantity: number;
}

  export interface ProductInfo {
  product_id: string;
  quantity: number;
  price: number;
  name: string;
}

  export interface PurchaseOrder {
  _id: string;
  image_url: string;
  items: ProductInfo[];
  purchase_date: string;
}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';

	let products: Product[] = [];

	const apiURL = 'http://143.42.222.62:8000';

	async function getProducts() {
		const res = await fetch(`${apiURL}/products?limit=6`);
		const json = await res.json();
		products = json;
	}

	onMount(async () => {
		getProducts();
	});
</script>

<Header />
<div class="container">
	<div class="image-container">
		<img class="image" src="/images/bag_image_frontpage.png" alt="frontpage" />
	</div>

	<div class="product-info">
		<h1>BRAND NEW PRODUCTS</h1>

		<p class="product-title-description">
			A wide selection of products can be found on our webshop
		</p>
	</div>

	<div class="product-container">
		{#each products as product}
			<div class="product">
				<img class="productImage" src={product.image_url} alt="a randomly generated" />
				<button><a href="/product/{product._id}">View item</a></button>
				<p class="product-description">{product.name}</p>
				<p class="product-price">{product.price} USD</p>
			</div>
		{/each}
	</div>

	<a href="/allproducts"><button class="view-all-btn">View All Items</button></a>
</div>
<Footer />

<style>
	.container {
		margin-top: 100px;
	}
	.image {
		justify-content: center;
		width: 1000px;
		height: auto;
	}

	.image-container {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}

	.productImage {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.product-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
	}

	.product-title-description {
		font-size: 20px;
		margin-top: 16px;
		margin-bottom: 16px;
	}

	.product-description {
		font-size: 24px;
		margin-top: 16px;
	}

	.product-price {
		font-size: 20px;
	}

	.product {
		width: 280px;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.product-container button {
		margin-top: 210px;
		font-size: 20px;
		position: absolute;
		border-radius: 5px;
		background-color: white;
		border: none;
		width: 200px;
		height: 45px;
	}

	.product-container button:hover {
		cursor: pointer;
		background-color: darkgrey;
	}

	.product-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		grid-row-gap: 16px;
		margin-bottom: 72px;
		margin-left: auto;
		margin-right: auto;
	}

	.view-all-btn {
		margin-bottom: 32px;
		color: white;
		background-color: black;
		border-radius: 5px;
		border-style: none;
		padding: 10px 100px 10px 100px;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}

	button:hover {
		cursor: pointer;
		background-color: #1a1918;
	}
</style>
