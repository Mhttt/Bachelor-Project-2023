<script lang="ts">
    import { cart } from "../stores/CartStore";

    import type CartItem from "../types/CartItem";
    import TrashIcon from "./icons/trash-icon.svelte";

    export let item: CartItem;
</script>

<div class="item-container">
    <div class="display">
        <img class="product-image" src={item.image_url} alt="bag" />
        <div class="title-and-price-container">
            <h2>{item.name} x{item.quantity}</h2>
            <p class="product-price">{item.price} USD</p>
        </div>
    </div>
    <div class="remove-item-container">
        <button
            class="trash-button"
            on:click={() => {
                cart.remove(item._id);
                alert("Item removed :)");
            }}
        >
            <TrashIcon />
        </button>
        <p style="font-size: 15px; margin-bottom: 12px">Remove item</p>
    </div>
</div>

<style>
    .item-container {
        display: flex;
        background-color: #f1f1f1;
        border-radius: 3px;
        justify-content: space-between;
        align-items: center;
        width: 1000px;
    }

    .display {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .product-image {
        width: 125px;
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

    .trash-button {
        background-color: transparent;
        border: none;
    }

    button:hover {
        cursor: pointer;
    }
</style>
