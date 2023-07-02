<script lang="ts">
    import background from "$lib/assets/pbackground.jpg";
    import { onMount, onDestroy } from "svelte";
    import { getPreviousPlayer, type Player, type PreviousPlayerResponse } from "./api";
    import { currentDaystamp, selectedRegion } from "./stores";
    import type { Unsubscriber } from "svelte/motion";
    import { DataFetchState, Region } from "./types";

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
        getPreviousPlayer(region).then((res) => {
            if (!res.success) {
                dataState = DataFetchState.Error;
                console.log("[PREVIOUS PLAYER] Request failed");
                return;
            }

            if (res.data === null) {
                dataState = DataFetchState.Error;
                console.log("[PREVIOUS PLAYER] null data");
                return;
            }

            // need to cast to unknown first so TypeScript doesn't complain that the intended cast
            // is a mistake/error
            let data = res.data as unknown as PreviousPlayerResponse;
            previousPlayer = data.player;
            dataState = DataFetchState.Fetched;
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
