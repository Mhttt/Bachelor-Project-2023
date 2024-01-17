<script lang="ts">
    import { goto } from "$app/navigation";
    import type { History } from "../../types/History";

    export let order: History;
</script>

<div class="item-container">
    <div class="item-info">
        <img class="product-image" src={order.image_url} alt="bag" />
        <div class="title-and-price-container">
            <p>Order #{order._id}</p>
            <p class="product-price">{new Date(order.purchase_date)}</p>
        </div>
    </div>
    <div class="price-order-container">
        <h3>
            $ {order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)} USD
        </h3>
        <button class="test" on:click={() => goto(`/history/${order._id}`)}
            >View Order</button
        >
    </div>
</div>

<style>
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

    .price-order-container button {
        background-color: black;
        color: white;
        border-radius: 5px;
        border-style: none;
        padding: 8px 24px 8px 24px;
        max-height: 50%;
    }

    button:hover {
        cursor: pointer;
    }
</style>
