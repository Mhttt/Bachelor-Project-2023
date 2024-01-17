<script lang="ts">
    import { onMount } from "svelte";
    import { getPurchases } from "../../api/purchase";
    import { goto } from "$app/navigation";
    import type { ActiveUser } from "../../types/ActiveUser";
    import { activeUser } from "../../stores/ActiveUserStore";
    import HistoryItem from "./history-item.svelte";
    import type { History } from "../../types/History";

    let user: ActiveUser | undefined;
    activeUser.subscribe((value) => (user = value));

    let orders: History[] = [];

    onMount(async () => {
        if (user === undefined) {
            alert("You must be logged in to view your purchase history");
            goto("/");
            return;
        }

        orders = await getPurchases(user.accessToken);
    });
</script>

<div class="container">
    <div class="title-and-description">
        <h2>HISTORY</h2>
        <p>Track your order history and view your latest purchases</p>
    </div>
    <div class="outer-item-container">
        {#each orders as order}
            <HistoryItem {order} />
        {/each}
    </div>
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
</style>
