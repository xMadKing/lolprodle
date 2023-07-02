<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { getResetTime, type ResetTimeResponse, type ResultResponse } from "./api";
    import { DataFetchState } from "./types";

    const SECOND_MILLIS = 1000;
    const MINUTE_MILLIS = SECOND_MILLIS * 60;
    const HOUR_MILLIS = MINUTE_MILLIS * 60;

    let dataState = DataFetchState.Loading;
    let resetTime = 0;
    let hours: number = -1;
    let minutes: number = -1;
    let seconds: number = -1;

    // interval related variables
    let requester: NodeJS.Timer;
    let ticker: NodeJS.Timer;

    onMount(() => {
        // request time from api (every 5 mins)
        updateResetTime(); // initial value
        requester = setInterval(updateResetTime, 1000 * 60 * 5);

        // makes the timer count down
        ticker = setInterval(() => {
            updateUnixToTimeComponents(resetTime);
        }, 1000);
    });

    onDestroy(() => clearInterval(requester));
    onDestroy(() => clearInterval(ticker));

    function updateResetTime() {
        dataState = DataFetchState.Loading;
        getResetTime().then((res) => {
            if (!res.success || res.data === null) {
                dataState = DataFetchState.Error;
                return;
            }

            dataState = DataFetchState.Fetched;
            resetTime = res.data.reset_time_unix_millis;
            // immediate update to prevent empty values in timer
            updateUnixToTimeComponents(resetTime);
        });
    }

    // unixMillis assumed to be in the future
    function updateUnixToTimeComponents(unixMillis: number) {
        let remainder = unixMillis - Date.now();

        hours = Math.floor(remainder / HOUR_MILLIS);
        remainder %= HOUR_MILLIS;

        minutes = Math.floor(remainder / MINUTE_MILLIS);
        remainder %= MINUTE_MILLIS;

        seconds = Math.floor(remainder / SECOND_MILLIS);
    }
</script>

<div class="flex flex-col items-center justify-center pb-5">
    <label class="label bg-base-200 rounded-t-box px-5 pt-3 w-96">
        <span class="label-text font-bold">RESETS IN...</span>
    </label>
    <div class="flex flex-row bg-base-200 justify-center rounded-b-box gap-5 py-8 w-96">
        {#if dataState === DataFetchState.Loading}
            <span class="loading loading-spinner loading-lg" />
        {:else if dataState === DataFetchState.Fetched}
            <div>
                <span class="countdown font-mono text-4xl">
                    <span style="--value:{hours};" />
                </span>
                hour{hours === 1 ? "" : "s"}
            </div>
            <div>
                <span class="countdown font-mono text-4xl">
                    <span style="--value:{minutes};" />
                </span>
                min
            </div>
            <div>
                <span class="countdown font-mono text-4xl">
                    <span style="--value:{seconds};" />
                </span>
                sec
            </div>
        {:else}
            <p class="text-error">Error while fetching the reset time :(</p>
        {/if}
    </div>
</div>
