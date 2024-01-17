<script setup lang="ts">
import IconStar from './icons/iconStar.vue';

</script>

<script lang="ts">
export default {
    props: {
        rating: Number,
        comment: String,
    }
}
</script>

<template>

<div class="review">

    <div class="stars">
        <template v-for="index in rating" :key="index">
            <IconStar />
        </template>
    </div>

    <p>
        {{ comment }}
    </p>
</div>

</template>

