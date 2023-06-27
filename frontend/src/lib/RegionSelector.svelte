<script lang="ts">
	import Lcs from "$lib/assets/lcs_adj.svg";
	import Lec from "$lib/assets/lec_adj.svg";
	import Lck from "$lib/assets/lck_adj.svg";
	import Lpl from "$lib/assets/lpl_adj.svg";

	const regions = [
		{
			name: "LCS",
			svg: Lcs,
		},
		{
			name: "LEC",
			svg: Lec,
		},
		{
			name: "LCK",
			svg: Lck,
		},
		{
			name: "LPL",
			svg: Lpl,
		},
	];
	let selectedRegion = "LCS";

	function selectRegion(region: string) {
		selectedRegion = region;
	}
</script>

<div class="flex items-center justify-center py-8">
	<ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
		{#each regions as region}
			<li>
				{#if selectedRegion === region.name}
					<a class="bg-primary hover:bg-primary flex flex-col">
						<img src={region.svg} class="w-40 h-40 m-0" />	
						<div>{region.name}</div>
					</a>
				{:else}
					<a on:click={() => selectRegion(region.name)} class="flex flex-col">
						<img src={region.svg} class="w-40 h-40" />
						<div>{region.name}</div>
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>
