import { readable, writable, type Writable } from "svelte/store";
import { Region, type PlayerGuess, Toast } from "./types";
import { getCurrentDaystampMillis } from "./api";

// The daystamp currently set in the currentDaystamp store
let currentSetDaystamp = getCurrentDaystampMillis();
// Current daystamp; automatically gets updated
// Components using this
export const currentDaystamp = readable(currentSetDaystamp, (set) => {
    const interval = setInterval(() => {
        // we want to only set the value (and update subscribers) ONLY if the current day changes,
        // otherwise, subscribers listening for a day change will prematurely update (shouldn't be a
        // problem in most cases, but this is a just-in-case thing)
        let daystamp = getCurrentDaystampMillis();
        if (currentSetDaystamp !== daystamp) {
            currentSetDaystamp = daystamp;
            set(daystamp);
        }
    }, 5000);

    return function stop() {
        clearInterval(interval);
    }
});
// All the names guessed by the user
export const currentGuessedNames: Writable<Array<string>> = writable([]);

// Contains the currently selected region
export const selectedRegion = writable(Region.Lcs);
// Contains the guesses for the current region
export const currentGuesses: Writable<Array<PlayerGuess>> = writable([]);
// Whether to show the settings modal
export const showSettings = writable(false);
// Toasts waiting to be displayed
export const toasts = writable(new Array<Toast>());
