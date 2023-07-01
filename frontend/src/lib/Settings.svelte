<script lang="ts">
    import { showSettings } from "./stores";
</script>

<dialog id="settings" class="modal modal-bottom sm:modal-middle" class:modal-open={$showSettings}>
    <form method="dialog" class="modal-box">
        <button
            on:click={() => ($showSettings = false)}
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
            ✕
        </button>
        <div class="border-b border-base-300 pb-5 mb-5">
            <h1 class="font-bold text-lg">Settings</h1>
            <p>Change preferences and view patch notes here</p>
        </div>

        <p class="text-error text-center">No settings available</p>
    </form>
</dialog>
