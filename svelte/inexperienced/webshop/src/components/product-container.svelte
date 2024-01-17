<script lang="ts">
    import { goto } from "$app/navigation";
    export let image: string;
    export let product_id: string;
    export let name: string;
    export let price: number;
</script>

<div class="product">
    <img src={image} alt="" />
    <button on:click={() => goto(`product/${product_id}`)}>View item</button>
    <p class="product-description">{name}</p>
    <p class="product-price">{price} USD</p>
</div>
