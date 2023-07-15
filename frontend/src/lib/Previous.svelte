<script lang="ts">
    import background from "$lib/assets/pbackground.jpg";
    import { onMount, onDestroy } from "svelte";
    import { currentDaystamp, selectedRegion } from "./stores";
    import type { Unsubscriber } from "svelte/motion";
    import { DataFetchState } from "./types";
    import type { Player, Region } from "leviathan-api";
    import { guessApi } from "./api";

    let dataState = DataFetchState.Loading;
    let unsubscribe: Unsubscriber | null = null;
    let previousPlayer: Player;

    onMount(() => {
        loadPreviousPlayer($selectedRegion);

        unsubscribe = currentDaystamp.subscribe((_daystamp) => {
            // new day; update previous player
            loadPreviousPlayer($selectedRegion);
        });
    });

    onDestroy(() => {
        if (unsubscribe !== null) {
            unsubscribe();
        }
    });

    function loadPreviousPlayer(region: Region) {
        dataState = DataFetchState.Loading;
        guessApi
            .previousPlayer(region)
            .then((res) => {
                previousPlayer = res.player;
                dataState = DataFetchState.Fetched;
            })
            .catch((e) => {
                console.log(e);
                dataState = DataFetchState.Error;
            });
    }
</script>

<div class="flex justify-center">
    <div class="card w-72 bg-base-200 image-full">
        <figure><img src={background} alt="LeagueImg" sizes="100" /></figure>
        <div class="card-body items-center">
            <h2 class="card-title">Yesterday's player was:</h2>
            {#if dataState === DataFetchState.Loading}
                <span class="loading loading-spinner loading-md" />
            {:else if dataState === DataFetchState.Fetched}
                <p class="font-bold">{previousPlayer.id}</p>
            {:else}
                <p class="text-error">No previous player</p>
            {/if}
        </div>
    </div>
</div>
