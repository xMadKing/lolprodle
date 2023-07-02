<script lang="ts">
    import GuessRow from "./GuessRow.svelte";
    import GuessLegend from "./GuessLegend.svelte";
    import { currentGuesses } from "$lib/stores";
</script>

<div class="flex flex-row content-center justify-center">
    <div class="card bg-base-200 text-neutral-content w-3/5">
        <div class="card-body items-center text-center">
            <h3 class="card-title">
                Your Guesses
                <GuessLegend />
            </h3>
            {#if $currentGuesses.length !== 0}
                {#each [...$currentGuesses].reverse() as guess}
                    <GuessRow {guess} />
                {/each}
            {:else}
                <p>No guesses yet - make a guess!</p>
            {/if}
        </div>
    </div>
</div>
