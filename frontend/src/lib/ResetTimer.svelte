<script lang="ts">
    import { onDestroy } from "svelte";
    import { getResetTime } from "./api";

    const SECOND_MILLIS = 1000;
    const MINUTE_MILLIS = SECOND_MILLIS * 60;
    const HOUR_MILLIS = MINUTE_MILLIS * 60;

    let resetTime: number;
    let hours: number;
    let minutes: number;
    let seconds: number;

    // request time from api (every 5 mins)
    updateResetTime(); // initial value
    let requester = setInterval(updateResetTime, 1000 * 60 * 5);
    onDestroy(() => clearInterval(requester));

    // makes the timer count down
    let ticker = setInterval(() => {
        updateUnixToTimeComponents(resetTime);
    }, 1000);
    onDestroy(() => clearInterval(ticker));

    function updateResetTime() {
        getResetTime()
            .then((res) => (resetTime = res.reset_time_unix_millis))
            .catch((err) => console.log(err));
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
