<script lang="ts">
    import { selectedRegion } from "$lib/stores";
    import { REGION_DATA } from "./consts";

    // Force no region to be selected (useful for the home page)
    export let forceNoSelection = false;

</script>

<div class="flex items-center justify-center">
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        {#each [...REGION_DATA] as [region, data]}
            <li>
                {#if !forceNoSelection && $selectedRegion === region}
                    <a class="bg-primary hover:bg-primary flex flex-col">
                        <img src={data.icon} class="w-16 h-16 lg:w-36 lg:h-36 m-0" />
                        {data.name}
                    </a>
                {:else}
                    <a class="flex flex-col" href="/{data.slugs[0]}">
                        <img src={data.icon} class="w-16 h-16 lg:w-36 lg:h-36" />
                        {data.name}
                    </a>
                {/if}
            </li>
        {/each}
    </ul>
</div>
