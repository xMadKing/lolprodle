<script lang="ts">
    import { regionStores } from "$lib/stores";
    import type { PlayerGuess, Region } from "$lib/types";
    import { onDestroy } from "svelte";
    import GuessRow from "./GuessRow.svelte";

    export let region: Region;

    const store = regionStores.get(region);
    if (store === undefined) {
        throw new Error("invalid region: " + region);
    }

    let guessStack: Array<PlayerGuess>;
    let unsubscribe = store.subscribe((value) => {
        guessStack = value;
    });

    onDestroy(unsubscribe);
</script>

<div class="flex flex-row content-center justify-center">
<div class="card bg-neutral text-neutral-content w-3/5">
    <div class="card-body items-center text-center">
        <h3 class="card-title">Your Guesses</h3>
        {#each guessStack as guess}
            <GuessRow {guess} />
        {/each}
    </div>
</div>
</div>
