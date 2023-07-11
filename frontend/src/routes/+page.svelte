<script>
    import RegionSelector from "$lib/RegionSelector.svelte";
    import ResetTimer from "$lib/ResetTimer.svelte";
    import lolprodle_logo from "$lib/assets/lolprodle_logo.svg";
    import favicon from "$lib/assets/favicon.svg";
</script>

<svelte:head>
    <link rel="icon" type="image/svg" href={favicon} />
</svelte:head>

<div class="flex items-center justify-center flex-col pt-10">
    <img src={lolprodle_logo} class="w-2/5 h-2/5" />
    <label class="label uppercase p-0 pt-5">
        <span class="label-text font-bold bg-base-200 p-3 rounded-t-lg">
            Choose a region to get started...
        </span>
    </label>
    <RegionSelector forceNoSelection={true} />
</div>

<div class="py-8">
    <ResetTimer />
</div>
