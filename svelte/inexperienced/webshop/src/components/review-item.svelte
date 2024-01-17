<script lang="ts">
    import StarIcon from "./icons/star-icon.svelte";

    export let rating: number;
    export let comment: string;
    export let author: string;
</script>

<div class="review">
    <div class="stars">
        {#each Array(rating) as _, i}
            <StarIcon />
        {/each}
    </div>

    <p>
        {comment} - {author}
    </p>
</div>
