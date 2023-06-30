<script lang="ts">
    import Previous from "./Previous.svelte";
    import Input from "./Input.svelte";
    import RegionSelector from "./RegionSelector.svelte";
    import HowToButton from "./HowToButton.svelte";
    import GuessBox from "./guess/GuessBox.svelte";
    import Timer from "./Timer.svelte";
    import type { Region } from "./types";
    import { selectedRegion } from "./stores";

    export let region: Region;
    
    selectedRegion.set(region);
</script>

<RegionSelector />
<Previous />
<div class="flex items-center justify-center pl-6 py-8">
    <Input />
    <HowToButton />
</div>
<GuessBox />
<Timer />
