<script lang="ts">
    import { onMount } from "svelte";
    import { toasts } from "./stores";
    import { Toast, ToastStatus } from "./types";

    onMount(async () => {
        setInterval(() => {
            // only keep toasts still alive
            $toasts = $toasts.filter((toast) => {
                return Date.now() < toast.lifeEndTimeMillis;
            });
        }, 1000);
    });
</script>

<div class="toast toast-end">
    {#each $toasts as toast}
        <div
            class="alert"
            class:alert-info={toast.status == ToastStatus.Info}
            class:alert-error={toast.status == ToastStatus.Error}
            class:alert-success={toast.status == ToastStatus.Success}
        >
            <span>{toast.message}</span>
        </div>
    {/each}
</div>
