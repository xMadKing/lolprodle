<script lang="ts">
    import { onMount } from "svelte";
    import { toasts } from "./stores";
    import { Toast, ToastStatus } from "./types";

    const UPDATE_INTERVAL_MILLIS = 100;
    const TOAST_DISPLAY_LIMIT = 5;

    // array of tuple (toast, timeLeft)
    // note this array has an implicit max size of TOAST_DISPLAY_LIMIT
    // note that any value in this array might be undefined
    let displayToasts = new Array<[Toast, number] | undefined>(TOAST_DISPLAY_LIMIT);

    onMount(async () => {
        setInterval(() => {
            // updates to the displayToasts array are done in place (no element shifting)
            // NOTE: in the future, we might want to shift elements to the left 
            // before inserting (to mimic new toasts coming from the bottom)
            for (let i = 0; i < TOAST_DISPLAY_LIMIT; i++) {
                let tup = displayToasts[i];
                if (tup !== undefined) {
                    tup[1] -= UPDATE_INTERVAL_MILLIS;
                    if (tup[1] <= 0) {
                        displayToasts[i] = undefined;
                    }
                }

                // replace/set new toast
                if (tup === undefined) {
                    let toast = $toasts.shift(); // always display oldest toast first
                    if (toast !== undefined) {
                        displayToasts[i] = [toast, toast.durationMillis];
                    }
                }
            }
        }, UPDATE_INTERVAL_MILLIS);
    });
</script>

<div class="toast toast-end z-10">
    {#each displayToasts as toast}
        {#if toast !== undefined}
            <div
                class="alert"
                class:alert-info={toast[0].status == ToastStatus.Info}
                class:alert-error={toast[0].status == ToastStatus.Error}
                class:alert-success={toast[0].status == ToastStatus.Success}
            >
                <span>{toast[0].message}</span>
            </div>
        {/if}
    {/each}
</div>
