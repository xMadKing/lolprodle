<script lang="ts">
    import Previous from "./Previous.svelte";
    import Input from "./Input.svelte";
    import RegionSelector from "./RegionSelector.svelte";
    import HowToButton from "./HowToButton.svelte";
    import GuessBox from "./guess/GuessBox.svelte";
    import ResetTimer from "./ResetTimer.svelte";
    import type { Region } from "./types";
    import { currentGuessedNames, currentGuesses, selectedRegion } from "./stores";
    import { onMount } from "svelte";
    import { loadGuessedNamesCookie, loadGuessesCookie } from "./cookies";
    import { getCurrentDaystampMillis } from "./api";

    export let region: Region;

    selectedRegion.set(region);

    onMount(() => {
        //todo: maybe move this into the appropriate components
        let currentDaystamp = getCurrentDaystampMillis();

        // load guesses
        let guessesCookie = loadGuessesCookie(region, currentDaystamp);
        currentGuesses.set(guessesCookie !== undefined ? guessesCookie.guesses : []);

        // load guessed names
        let guessedNamesCookie = loadGuessedNamesCookie(region, currentDaystamp);
        currentGuessedNames.set(guessedNamesCookie !== undefined ? guessedNamesCookie : []);
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
