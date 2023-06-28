<script lang="ts">
    import { regionStores, selectedRegion } from "$lib/stores";
    import { PlayerGuess, Region } from "$lib/types";
    import { onDestroy } from "svelte";
    import GuessRow from "./GuessRow.svelte";
    import type { Unsubscriber } from "svelte/motion";
    import GuessLegend from "./GuessLegend.svelte";

    let region: Region = Region.Lcs;
    let currentRegionStoreUnsubscribe: Unsubscriber = () => {};
    let guessStack: Array<PlayerGuess>;

    let unsubscribe = selectedRegion.subscribe((value) => {
        region = value;

        currentRegionStoreUnsubscribe();

        const store = regionStores.get(region);
        if (store === undefined) {
            throw new Error("invalid region: " + region);
        }

        currentRegionStoreUnsubscribe = store.subscribe((value) => {
            guessStack = value;
        });
    });

    onDestroy(unsubscribe);
    // need to have another calling function since the current region store unsubscribe function
    // can be changed throughout the duration of this component
    onDestroy(() => {
        currentRegionStoreUnsubscribe();
    });
</script>

<div class="flex flex-row content-center justify-center">
    <div class="card bg-base-200 text-neutral-content w-3/5">
        <div class="card-body items-center text-center">
            <h3 class="card-title">
                Your Guesses
                <GuessLegend />
            </h3>
            {#if guessStack.length !== 0}
                {#each guessStack as guess}
                    <GuessRow {guess} />
                {/each}
            {:else}
                <p>No guesses yet - make a guess!</p>
            {/if}
        </div>
    </div>
</div>
