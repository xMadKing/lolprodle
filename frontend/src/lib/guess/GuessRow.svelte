<script lang="ts">
    import type { PlayerGuess } from "$lib/types";
    import GuessCategoryCard from "./GuessCategoryCard.svelte";

    export let guess: PlayerGuess;
</script>

<div
    id="guess-row"
    class="flex flex-row gap-x-2 p-4 bg-base-100 border-2 rounded-lg border-base-200
    overflow-x-scroll"
>
    {#each guess.categories as category}
        <GuessCategoryCard guessCategory={category} />
    {/each}
</div>

<style lang="postcss">
    /* vars: --p is primary color, --s is secondary color */

    #guess-row {
        /* Firefox */
        scrollbar-width: none;

        /* Edge */
        -ms-overflow-style: none;
    }

    /* Chrome, Edge, Safari, Opera */
    #guess-row::-webkit-scrollbar {
        display: none;
    }
</style>
