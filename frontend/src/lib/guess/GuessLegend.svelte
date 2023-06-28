<script lang="ts">
</script>

<div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-4 h-4 stroke-current"
        >
            <path
                stroke-linecap="square"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    </label>
    <div
        tabindex="0"
        class="card compact dropdown-content z-[1] shadow bg-base-200 rounded-box w-64"
    >
        <div class="card-body text-left font-normal">
            <h2 class="card-title">Card Legend</h2>
            <p>
                As you guess, different cards for each category will appear with a different color.
            </p>
            <br />
            <div class="flex flex-row justify-center content-center gap-x-2">
                <svg width="25" height="25">
                    <rect width="25" height="25" class="fill-red-400" />
                </svg>
                <p>Incorrect value for the category</p>
            </div>
            <div class="flex flex-row justify-center content-center gap-x-2">
                <svg width="25" height="25">
                    <rect width="25" height="25" class="fill-green-500" />
                </svg>
                <p>Correct value for the category</p>
            </div>
            <br />
            <p>Get all categories to be green to correctly guess the player!</p>
        </div>
    </div>
</div>
