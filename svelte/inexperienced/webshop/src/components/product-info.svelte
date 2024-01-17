<script lang="ts">
    import type ProductInterface from "../types/ProductInterface";
    import { cart } from "../stores/CartStore";
    import type { Review } from "../types/Review";
    import ReviewItem from "./review-item.svelte";
    import { activeUser } from "../stores/ActiveUserStore";
    import type { ActiveUser } from "../types/ActiveUser";
    import { field, form } from "svelte-forms";
    import { max, min, required } from "svelte-forms/validators";
    import { addReview, getReviews } from "../api/reviews";

    export let product: ProductInterface;
    export let reviews: Review[];

    let user: ActiveUser | undefined;
    activeUser.subscribe((value) => (user = value));

    const rating = field("rating", 0, [min(1), max(5)]);
    const comment = field("comment", "", [required(), min(10)]);

    const reviewForm = form(rating, comment);

    async function onSubmit() {
        if (user === undefined) {
            alert("You must be logged in to add a review");
            return;
        }

        await Promise.all([rating.validate(), comment.validate()]);

        if ($reviewForm.errors.length) {
            return alert("Invalid form! Please try again");
        }

        const response = await addReview(
            {
                rating: $rating.value,
                comment: $comment.value,
                rater: user.username,
                product_id: product._id,
            },
            user.accessToken
        );

        if (response.status_code >= 400) {
            return alert(`ERROR: ${response.detail}`);
        }

        reviews = await getReviews(product._id);
        reviewForm.reset();
        return alert("Comment added!");
    }
</script>

<!-- Product Information -->
<main>
    <div class="pi-product">
        <div class="pi-product-image">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img
                src={product.image_url}
                alt="Product Image"
                class="pi-product-image"
            />
        </div>

        <div class="pi-product-info">
            <h3>{product.name}</h3>
            <p>{product.short_description}</p>

            <h2>{product.price} USD</h2>
            <button
                class="pi-product-item-buttons"
                on:click={() => {
                    cart.add(product);
                    alert("Added to cart!");
                }}>Add to Cart</button
            >

            <h4>Description</h4>
            <p>
                {product.long_description}
            </p>
        </div>
    </div>

    <!-- Reviews -->
    <h1>Product Reviews</h1>

    <div class="reviews">
        {#if !reviews.length}
            <p>No reviews yet</p>
        {/if}

        {#each reviews as review}
            <ReviewItem
                author={review.rater}
                comment={review.comment}
                rating={review.rating}
            />
        {/each}
    </div>

    <!-- Leave a review -->
    <h1>Leave a Review</h1>

    <section class="user-input">
        <select class="input-stars" bind:value={$rating.value}>
            <option value={0}>-- Please choose an option --</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
        </select>

        {#if $reviewForm.hasError("rating.min")}
            <p class="input-error">Must at least be 1 star</p>
        {/if}

        <textarea
            class="input-feedback"
            placeholder="Write what you think about the product"
            bind:value={$comment.value}
        />

        {#if $reviewForm.hasError("comment.required")}
            <p class="input-error">You must write a comment</p>
        {/if}

        {#if $reviewForm.hasError("comment.min")}
            <p class="input-error">
                Your comment must be at least 10 characters
            </p>
        {/if}

        <button class="pi-product-item-buttons" on:click={() => onSubmit()}
            >Submit Review</button
        >
    </section>
</main>

<style>
    .input-error {
        color: red;
        border: 1px solid red;
        padding: 8px;
        font-weight: bold;
        border-radius: 8px;
    }
</style>
