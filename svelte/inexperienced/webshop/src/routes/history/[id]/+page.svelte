<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { activeUser } from "../../../stores/ActiveUserStore";
    import { getPurchase } from "../../../api/purchase";
    import type { ActiveUser } from "../../../types/ActiveUser";
    import HistoryOrderItem from "./history-order-item.svelte";
    import type { History } from "../../../types/History";

    let user: ActiveUser | undefined;
    activeUser.subscribe((value) => (user = value));

    let purchase: History | undefined;

    onMount(async () => {
        if (user === undefined) {
            alert("You must be logged in to view your purchase history");
            goto("/");
            return;
        }

        purchase = await getPurchase($page.params.id, user.accessToken);
    });
</script>

<div>
    <div class="container">
        <div class="title-and-description">
            <h2>HISTORY - ORDER #312837</h2>
            <p>
                List of all items purchased on January 27th with order ID
                #312837.
            </p>
        </div>
        <div class="outer-item-container">
            <button on:click={() => goto("/history")}>&lt;- Go back</button>

            {#if purchase === undefined}
                <p>Loading...</p>
            {:else}
                {#each purchase.items as item}
                    <HistoryOrderItem {item} image={purchase.image_url} />
                {/each}
            {/if}
        </div>
    </div>
    <p>
        TOTAL {purchase?.items.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0
        )} USD
    </p>
</div>

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
    }

    .title-and-description h2 {
        align-self: center;
    }

    .outer-item-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .outer-item-container button {
        background-color: black;
        color: white;
        border-radius: 5px;
        border-style: none;
        padding: 8px 24px 8px 24px;
        max-width: 20%;
    }

    button:hover {
        cursor: pointer;
    }
</style>
