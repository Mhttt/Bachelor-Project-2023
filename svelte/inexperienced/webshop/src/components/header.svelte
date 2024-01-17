<script lang="ts">
    import { goto } from "$app/navigation";
    import { activeUser } from "../stores/ActiveUserStore";
    import CartIcon from "./icons/cart-icon.svelte";
    import ProfileIcon from "./icons/profile-icon.svelte";
    import type { ActiveUser } from "../types/ActiveUser";

    let user: ActiveUser | undefined;

    activeUser.subscribe((value) => (user = value));
</script>

<header>
    <div class="text-icon">
        <button class="svg-button">
            <ProfileIcon />
        </button>
        {#if user === undefined}
            <p on:click={() => goto("/login")} class="white-text">Login</p>
            <p on:click={() => goto("/register")} class="white-text">
                Register
            </p>
        {:else}
            <p class="white-text">Hi, {user.username}</p>
        {/if}
    </div>
    <h2
        on:click={() => goto("/")}
        class="white-text shop-title"
        style="padding-right: 60px"
    >
        WEBSHOP
    </h2>
    <div class="text-icon">
        <button class="svg-button">
            <CartIcon />
        </button>
        <p class="white-text" on:click={() => goto("/cart")}>Cart</p>
    </div>
</header>

<style scoped>
    .white-text:hover {
        cursor: pointer;
    }

    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
        min-height: 60px;
        background-color: black;
        width: 100%;
    }

    .shop-title {
        align-self: center;
    }

    .text-icon {
        display: flex;
        align-items: center;
        padding-left: 8px;
        padding-right: 8px;
    }

    .white-text {
        color: white;
        padding-left: 10px;
        font-size: 22px;
    }

    .svg-button {
        background-color: transparent;
        border-style: none;
    }
</style>
