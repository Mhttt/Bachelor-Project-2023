<script lang="ts">
  import Cookie from "js-cookie";
  import { onMount } from "svelte";

  export let freeShipping = false;

  onMount(async () => {
    // If we don't have a cookie
    if (Cookie.get("freeShipping") === undefined) {
      if (Math.floor(Math.random() * (1 - 0 + 1) + 0) === 0) {
        Cookie.set("freeShipping", "true");
        return (freeShipping = true);
      }
      // if the dice roll is 1, set freeshipping to false;
      return Cookie.set("freeShipping", "false");
    }

    // If we have an existing cookie
    if (Cookie.get("freeShipping") === "true") {
      return (freeShipping = true);
    }
  });
</script>

{#if freeShipping}
  <header>
    <h2 class="white-text shop-title">
      CONGRATULATIONS! YOU GOT FREE SHIPPING.
    </h2>
  </header>
{/if}

<style scoped>

  header {
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    z-index: 200;
    background-color: rgb(242, 136, 136);
    margin-bottom: 0px;
    width: 100%;
  }

  .white-text {
    color: #000000;
    font-size: 16px;
    text-align: center;
    width: 100%;
    line-height: 50px;
  }
</style>
