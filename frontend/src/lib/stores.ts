import { writable, type Writable } from "svelte/store";
import { Region, type PlayerGuess, GuessCategory, REGION_DATA, Toast } from "./types";

// Contains the currently selected region
export const selectedRegion = writable(Region.Lcs);
// Guesses for each region
export const regionStores = new Map<number, Writable<Array<PlayerGuess>>>();

// Whether to show the settings modal
export const showSettings = writable(false);

// unix time denoting next reset
export const resetTimeMillis = writable(1688184000000 + 86400000);

export const toasts = writable(new Array<Toast>());

function createRegionStores() {
    for (let i = 0; i < Object.keys(Region).length; i++) {
        const name = REGION_DATA.get(i);
        if (name === undefined) {
            continue;
        }

        regionStores.set(i, writable(new Array<PlayerGuess>()));
    }

    // dummy data
    regionStores.get(Region.Lcs)?.update((value) => {
        value.push({
            categories: [
                { category: GuessCategory.Name, correct: false, guess: "aaa" },
                { category: GuessCategory.Role, correct: true, guess: "aaa" },
                { category: GuessCategory.Country, correct: true, guess: "aaa" },
                { category: GuessCategory.FavoriteChamps, correct: false, guess: "aaa" },
                { category: GuessCategory.Titles, correct: false, guess: "aaa" },
            ]
        });
        value.push({
            categories: [
                { category: GuessCategory.Name, correct: false, guess: "aaa" },
                { category: GuessCategory.Role, correct: true, guess: "aaa" },
                { category: GuessCategory.Country, correct: true, guess: "aaa" },
                { category: GuessCategory.FavoriteChamps, correct: false, guess: "aaa" },
                { category: GuessCategory.Titles, correct: false, guess: "aaa" },
            ]
        });
        return value;
    });
}

createRegionStores();
