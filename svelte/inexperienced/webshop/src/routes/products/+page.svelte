<script lang="ts">
  import "../css/all-products.css";
  import { onMount } from "svelte";
  import ProductComponent from "../../components/product-container.svelte";
  import type ProductInterface from "../../types/ProductInterface";
  import { getProducts } from "../../api/product";
  import SearchfieldIcon from "../../components/icons/searchfield-icon.svelte";

  let products: ProductInterface[] = [];

  let searchfield = "";

  function filterByName(products: ProductInterface[], name: string) {
    const nameToLower = name.toLowerCase();
    return products.filter((item) =>
      item.name.toLowerCase().includes(nameToLower)
    );
  }

  $: filteredList = filterByName(products, searchfield);

  onMount(async () => {
    products = await getProducts();
  });
</script>

<div class="all-products">
  <h1>ALL PRODUCTS</h1>
  <p class="product-title-description">
    A wide selection of products can be found on our webshop
  </p>

  <div class="searchfield-container">
    <input
      bind:value={searchfield}
      class="searchfield"
      type="text"
      placeholder="Search for a product"
    />
    <SearchfieldIcon />
    
  </div>
</div>
<div class="product-container">
  {#each filteredList as product}
    <ProductComponent
      product_id={product._id}
      image={product.image_url}
      price={product.price}
      name={product.name}
    />
  {/each}
</div>

