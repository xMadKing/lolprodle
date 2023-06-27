<script lang="ts">
    import type { PlayerGuess } from "$lib/types";
    import GuessFieldCard from "./GuessFieldCard.svelte";

    export let guess: PlayerGuess;
</script>

<div class="flex flex-row gap-x-2 p-4 bg-base-100 border-2 rounded-lg border-base-200">
    {#each guess.guessFields as field}
        <GuessFieldCard {field} />
    {/each}
</div>
