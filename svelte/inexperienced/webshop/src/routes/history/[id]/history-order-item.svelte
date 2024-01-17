<script lang="ts">
    import type { HistoryItem } from "../../../types/History";

    export let item: HistoryItem;
    export let image: string;
</script>

<div class="item-container">
    <div class="item-info">
        <img class="product-image" src={image} alt="bag" />
        <div class="title-and-price-container">
            <p>{item.name} x{item.quantity}</p>
            <p class="product-price">{item.price} USD</p>
        </div>
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
</style>
