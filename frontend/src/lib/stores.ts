import { writable, type Writable } from "svelte/store";
import { Region, type PlayerGuess, REGION_DATA, Toast } from "./types";

// Contains the currently selected region
export const selectedRegion = writable(Region.Lcs);
// Contains the guesses for the current region
export const currentGuesses: Writable<Array<PlayerGuess>> = writable([]);

// Guesses for each region
export const regionStores = new Map<number, Writable<Array<PlayerGuess>>>();

// Whether to show the settings modal
export const showSettings = writable(false);

export const toasts = writable(new Array<Toast>());

function createRegionStores() {
    for (let i = 0; i < Object.keys(Region).length; i++) {
        const name = REGION_DATA.get(i);
        if (name === undefined) {
            continue;
        }

        regionStores.set(i, writable(new Array<PlayerGuess>()));
    }
}

createRegionStores();
