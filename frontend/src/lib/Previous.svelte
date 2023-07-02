<script lang="ts">
    import background from "$lib/assets/pbackground.jpg";
    import { onMount, onDestroy } from "svelte";
    import {  getPreviousPlayer, type PreviousPlayerResponse } from "./api";
    import { currentDaystamp, selectedRegion } from "./stores";
    import type { Unsubscriber } from "svelte/motion";

    let unsubscribe: Unsubscriber;
    let previousPlayer: Promise<PreviousPlayerResponse> = getPreviousPlayer($selectedRegion);

    onMount(() => {
        unsubscribe = currentDaystamp.subscribe((_daystamp) => {
            // new day; update previous player
            previousPlayer = getPreviousPlayer($selectedRegion);
        });
    });

    onDestroy(() => unsubscribe());
</script>

<div class="flex justify-center">
    <div class="card w-72 bg-base-200 image-full">
        <figure><img src={background} alt="LeagueImg" sizes="100" /></figure>
        <div class="card-body items-center">
            <h2 class="card-title">Yesterday's player was:</h2>
            {#await previousPlayer}
                <span class="loading loading-spinner loading-md" />
            {:then res}
                <p class="font-bold">{res.player.id}</p>
            {:catch err}
                <p class="text-error">{err.message}</p>
            {/await}
        </div>
    </div>
</div>
