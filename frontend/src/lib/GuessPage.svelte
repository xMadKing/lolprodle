<script lang="ts">
    import Previous from "./Previous.svelte";
    import Input from "./Input.svelte";
    import RegionSelector from "./RegionSelector.svelte";
    import HowToButton from "./HowToButton.svelte";
    import GuessBox from "./guess/GuessBox.svelte";
    import ResetTimer from "./ResetTimer.svelte";
    import type { Region } from "./types";
    import { currentGuesses, selectedRegion } from "./stores";
    import { onMount } from "svelte";
    import { loadGuessesCookie } from "./cookies";
    import { getCurrentDaystampMillis } from "./api";

    export let region: Region;

    selectedRegion.set(region);

    onMount(() => {
        // load guesses
        let current_daystamp = getCurrentDaystampMillis();
        let cookie = loadGuessesCookie(region, current_daystamp);
        currentGuesses.set(cookie !== undefined ? cookie.guesses : []);
    });
</script>

<div class="py-8">
    <RegionSelector />
</div>
<Previous />
<div class="flex items-center justify-center pl-6 py-8">
    <Input />
    <HowToButton />
</div>
<GuessBox />

<div class="py-8">
    <ResetTimer />
</div>
