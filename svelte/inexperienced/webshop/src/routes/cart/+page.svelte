<script lang="ts">
    import { cart } from "../../stores/CartStore";
    import CartItem from "../../components/cart-item.svelte";
    import type CartItemType from "../../types/CartItem";
    import { onDestroy } from "svelte";
    import { activeUser } from "../../stores/ActiveUserStore";
    import type { ActiveUser } from "../../types/ActiveUser";
    import { purchase } from "../../api/purchase";

    let items: CartItemType[] = [];

    let user: ActiveUser | undefined;
    activeUser.subscribe((value) => (user = value));

    const unsubscribe = cart.subscribe((value) => {
        console.log("ITEMS", value);
        items = value;
    });

    const purchaseItems = async () => {
        if (!items.length) {
            alert("Your cart is empty!");
            return;
        }

        const res = await purchase(items, user?.accessToken as string);

        if (res.ok) {
            cart.clear();
            alert("Purchase successful!");
        } else {
            alert("Purchase failed!");
        }
    };

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="cart-container">
    <h2>CART</h2>
    <p class="cart-description">
        Take a look at what you have in your cart so far and order when you feel
        ready
    </p>

    {#if !items.length}
        <h1>Your cart is empty</h1>
    {/if}

    <div class="cart-items">
        {#each items as item}
            <CartItem {item} />
        {/each}
    </div>

    <div class="checkout-container">
        <h2>TOTAL 297 USD</h2>
        <button class="checkout-button" on:click={() => purchaseItems()}
            >GO TO CHECKOUT</button
        >
    </div>
</div>

<style>
    .cart-items {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 16px;
        margin-bottom: 16px;
    }

    .cart-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    .checkout-container {
        display: flex;
        justify-content: space-between;
        width: 1000px;
    }

    button {
        background-color: black;
        color: white;
        border-radius: 5px;
        padding: 8px 16px;
        border-style: none;
    }

    button:hover {
        cursor: pointer;
    }
</style>
