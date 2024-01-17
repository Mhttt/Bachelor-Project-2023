<script lang="ts">
    import { onMount } from "svelte";
    import "./css/frontpage.css";

    import fpImage from "../lib/images/bag_image_frontpage.png";
    import { goto } from "$app/navigation";
    import { API_URL } from "../api/constants";
    import type ProductInterface from "../types/ProductInterface";
    import ProductComponent from "../components/product-container.svelte";

    let products: ProductInterface[] = [];

    onMount(async () => {
        products = (await (
            await fetch(`${API_URL}/products?limit=6`)
        ).json()) as ProductInterface[];
    });
</script>

<div class="image-container">
    <img class="image" src={fpImage} alt="" />
</div>

<div class="product-info">
    <h1>BRAND NEW PRODUCTS</h1>

    <p class="product-title-description">
        A wide selection of products can be found on our webshop
    </p>
</div>

{#if products.length === 0}
    <h1>loading products...</h1>
{:else}
    <div class="product-container">
        {#each products as product}
            <ProductComponent
                product_id={product._id}
                image={product.image_url}
                price={product.price}
                name={product.name}
            />
        {/each}
    </div>

    <button on:click={() => goto("/products")} class="view-all-btn"
        >View All Items
    </button>
{/if}
