<script lang="ts">
    import Previous from "./Previous.svelte";
    import Input from "./Input.svelte";
    import RegionSelector from "./RegionSelector.svelte";
    import GuessBox from "./guess/GuessBox.svelte";
    import ResetTimer from "./ResetTimer.svelte";
    import type { Region } from "./types";
    import { correctGuess, currentGuessedNames, currentGuesses, selectedRegion } from "./stores";
    import { onMount } from "svelte";
    import {
        loadCorrectGuessCookie,
        loadGuessedNamesCookie,
        loadGuessesCookie,
        removeCorrectGuessCookie,
    } from "./cookies";
    import { getCurrentDaystampMillis } from "./api";
    import { loadAllGuesses, verifyGuess } from "./guess/guess";
    import CorrectGuessAnimation from "./CorrectGuessAnimation.svelte";
    import { REGION_DATA } from "./consts";

    export let region: Region;

    selectedRegion.set(region);

    // need to update the stores right way, as otherwise, if the user navigates using the region
    // selector menu, the previous value for the stores (that is, the value for that previous
    // region) will still be in the store
    correctGuess.set(undefined);
    currentGuesses.set([]);

    onMount(async () => {
        // load cookies for current daystamp
        // todo: maybe move this into the appropriate components

        let currentDaystamp = getCurrentDaystampMillis();

        // removed; these cookies tend to get too large -- need to figure out a better solution in
        // the future (spreading it across multiple cookies maybe)
        // let guessesCookie = loadGuessesCookie(region, currentDaystamp);
        // currentGuesses.set([]);

        let guessedNamesCookie = loadGuessedNamesCookie(region, currentDaystamp);
        guessedNamesCookie = guessedNamesCookie !== undefined ? guessedNamesCookie : [];
        loadAllGuesses(region, guessedNamesCookie);
        currentGuessedNames.set(guessedNamesCookie);

        let correctGuessCookie = loadCorrectGuessCookie(region, currentDaystamp);
        if (correctGuessCookie !== undefined) {
            // verify that correct guess is indeed the actual correct guess (just-in-case measure if
            // the server [for some reason] changes the player of the day for the current daystamp)
            let verified = await verifyGuess(region, correctGuessCookie);
            if (verified !== undefined && !verified) {
                // we don't want to keep the cookie around if it is incorrect (prevents us from
                // doing this verification process again next time if the user does not end up
                // guessing)
                removeCorrectGuessCookie(region, currentDaystamp);
                correctGuessCookie = undefined;
            } else {
                correctGuess.set(correctGuessCookie);
            }
        }
    });
</script>

<svelte:head>
    <link rel="icon" type="image/svg" href={REGION_DATA.get(region)?.icon} />
</svelte:head>

<div class="py-8">
    <RegionSelector />
</div>
<Previous />
<div class="flex items-center justify-center mt-10">
    <Input />
</div>
<div class="mt-10">
    <GuessBox />
</div>

<div class="py-8">
    <ResetTimer />
</div>

{#if $correctGuess !== undefined}
    <CorrectGuessAnimation />
{/if}
