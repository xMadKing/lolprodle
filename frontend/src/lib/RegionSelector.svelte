<script lang="ts">
    import Lcs from "$lib/assets/lcs_adj.svg";
    import Lec from "$lib/assets/lec_adj.svg";
    import Lck from "$lib/assets/lck_adj.svg";
    import Lpl from "$lib/assets/lpl_adj.svg";
    import { selectedRegion } from "$lib/stores";
    import { REGION_DATA, Region } from "./types";

    const regions = [
        {
            id: Region.Lcs,
            svg: Lcs,
        },
        {
            id: Region.Lec,
            svg: Lec,
        },
        {
            id: Region.Lck,
            svg: Lck,
        },
        {
            id: Region.Lpl,
            svg: Lpl,
        },
    ];
</script>

<div class="flex items-center justify-center py-8">
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        {#each regions as region}
            <li>
                {#if $selectedRegion === region.id}
                    <a class="bg-primary hover:bg-primary flex flex-col">
                        <img src={region.svg} class="w-36 h-36 m-0" />
                        {REGION_DATA.get(region.id)?.name}
                    </a>
                {:else}
                    <a on:click={() => $selectedRegion = region.id} class="flex flex-col">
                        <img src={region.svg} class="w-36 h-36" />
                        {REGION_DATA.get(region.id)?.name}
                    </a>
                {/if}
            </li>
        {/each}
    </ul>
</div>
