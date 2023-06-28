<script lang="ts">
    import { onDestroy } from "svelte";
    import { resetTimeMillis } from "./stores";

    const SECOND_MILLIS = 1000;
    const MINUTE_MILLIS = SECOND_MILLIS * 60;
    const HOUR_MILLIS = MINUTE_MILLIS * 60;

    let resetTime: number;
    let hours: number;
    let minutes: number;
    let seconds: number;

    // listen for any changes in the reset time
    const unsubscribe = resetTimeMillis.subscribe((value) => {
        resetTime = value;
        updateUnixToTimeComponents(value);
    });
    onDestroy(unsubscribe);

    // makes the timer count down
    let ticker = setInterval(() => {
        updateUnixToTimeComponents(resetTime);
    }, 1000);
    onDestroy(() => clearInterval(ticker));

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

<div class="flex item-center justify-center pr-60 py-0">
    <label class="label">
        <span class="label-text font-bold">RESETS IN...</span>
    </label>
</div>
<div class="flex flex-row items-center justify-center pb-5">
    <div class="flex bg-base-200 rounded-box gap-5 py-8 px-8">
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
    </div>
</div>
