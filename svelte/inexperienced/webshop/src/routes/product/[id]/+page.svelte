<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ProductInfoComponent from "../../../components/product-info.svelte";
    import type ProductInterface from "../../../types/ProductInterface";
    import { getProduct } from "../../../api/product";
    import { getReviews } from "../../../api/reviews";
    import type { Review } from "../../../types/Review";

    let product: ProductInterface;
    let reviews: Review[];

    onMount(async () => {
        const [productRes, reviewsRes] = await Promise.all([
            getProduct($page.params.id),
            getReviews($page.params.id),
        ]);

        product = productRes;
        reviews = reviewsRes;
    });
</script>

<title>Product info</title>
{#if product === undefined}
    <p>loading product...</p>
{:else}
    <ProductInfoComponent {product} {reviews} />
{/if}

<style scoped>
    @import "../../css/product-info.css";
</style>
