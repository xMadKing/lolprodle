<script lang="ts">
	const regions = ['LCS', 'LEC', 'LCK', 'LPL'];
	let selectedRegion = 'LCS';

	function selectRegion(region: string) {
		selectedRegion = region;
	}
</script>

<div class="flex items-center justify-center py-8">
	<ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
		{#each regions as region}
			{#if selectedRegion === region}
				<li><a class="bg-primary hover:bg-primary">{region}</a></li>
			{:else}
				<li><a on:click={() => selectRegion(region)}>{region}</a></li>
			{/if}
		{/each}
	</ul>
</div>
