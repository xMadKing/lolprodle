<script lang="ts">
    import type { PlayerGuess } from "$lib/types";
    import GuessCategoryCard from "./GuessCategoryCard.svelte";

    export let guess: PlayerGuess;
</script>

<div class="flex flex-row gap-x-2 p-4 bg-base-100 border-2 rounded-lg border-base-200">
    {#each guess.categories as category}
        <GuessCategoryCard guessCategory={category} />
    {/each}
</div>
