<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../../components/Footer.svelte';
	import Header from '../../components/Header.svelte';
	import type Product from '../+page.svelte';

	let allProducts: Product[] = [];
	let currentProducts: Product[] = [];
	let searchTerm: string = '';

	const apiURL = 'http://143.42.222.62:8000';

	async function getProducts() {
		const res = await fetch(`${apiURL}/products`);
		const json = await res.json();
		allProducts = json;
		currentProducts = json;
	}

	async function onSearch() {
		if (!searchTerm || searchTerm.length < 1) {
			return (currentProducts = allProducts);
		}

		if (allProducts && allProducts.length > 0) {
			return (currentProducts = allProducts.filter(
				(v) => v.name.toLowerCase().trim().indexOf(searchTerm.toLowerCase().trim()) != -1
			));
		}
		return;
	}

	onMount(async () => {
		getProducts();
	});
</script>

<Header />
<div class="container">
	<div class="all-products">
		<h1>ALL PRODUCTS</h1>
		<p class="product-title-description">
			A wide selection of products can be found on our webshop
		</p>

		<div class="searchfield-container">
			<input
				bind:value={searchTerm}
				on:input={() => onSearch()}
				class="searchfield"
				type="text"
				placeholder="Search for a product"
			/>

			<svg class="svg-icon" viewBox="0 0 1024 1024" version="1.1">
				<path
					d="M398.9 735.5c-185.4 0-336.3-150.9-336.3-336.3C62.7 213.9 213.5 63 398.9 63s336.2 150.9 336.2 336.2c0.1 185.4-150.8 336.3-336.2 336.3m0-597.8c-144.2 0-261.5 117.3-261.5 261.5s117.4 261.5 261.5 261.5c144.2 0 261.5-117.3 261.5-261.5 0.1-144.2-117.3-261.5-261.5-261.5"
					fill="#C6CCDA"
				/>
				<path
					d="M865.9 959.6c-23.9 0-47.8-9.1-66-27.3L540.3 672.6c-14.6-14.6-14.6-38.3 0-52.8 14.6-14.6 38.2-14.6 52.8 0l259.6 259.7c7.4 7.4 19 7.4 26.4 0 3.7-3.7 5.5-8.1 5.5-13.2s-1.9-9.5-5.5-13.2L717.9 691.8c-14.6-14.6-14.6-38.2 0-52.8 14.6-14.6 38.2-14.6 52.8 0l161.2 161.2c17.7 17.7 27.4 41.1 27.4 66s-9.7 48.3-27.4 66c-18.2 18.2-42.1 27.4-66 27.4M249.5 436.6c-20.6 0-37.3-16.7-37.3-37.4 0-103 83.8-186.8 186.8-186.8 20.6 0 37.3 16.7 37.3 37.4 0 20.6-16.7 37.3-37.3 37.3-61.8 0-112.1 50.3-112.1 112.1 0 20.6-16.8 37.4-37.4 37.4"
					fill="#C6CCDA"
				/>
			</svg>
		</div>
	</div>
	<div class="product-container">
		{#each currentProducts as product}
			<div class="product">
				<img class="productImage" src={product.image_url} alt="a randomly generated" />
				<button><a href="/product/{product._id}">View item</a></button>
				<p class="product-description">{product.name}</p>
				<p class="product-price">{product.price} USD</p>
			</div>
		{/each}
	</div>
</div>
<Footer />

<style>
	.container {
		margin-top: 100px;
	}

	h1 {
		margin-top: 20px;
	}

	.svg-icon {
		height: 24px;
		margin-right: 8px;
	}

	.searchfield-container {
		display: flex;
		background-color: #e8e8e8;
		border-radius: 5px;
		height: 40px;
		margin-bottom: 24px;
	}

	.productImage {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.searchfield {
		background-color: #e8e8e8;
		border: none;
		border-radius: 5px;
		height: 40px;
		width: 328px;
		margin-bottom: 60px;
		padding-left: 16px;
	}

	.searchfield:focus {
		outline: none;
		padding-left: 16px;
	}

	.all-products {
		display: grid;
		place-items: center;
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
		margin-top: 24px;
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

	button:hover {
		cursor: pointer;
	}

	.product-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		grid-row-gap: 16px;
		margin-bottom: 32px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
