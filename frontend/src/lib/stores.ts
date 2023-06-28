import { writable, type Writable } from "svelte/store";
import { Region, PlayerGuess, PlayerGuessCategory, GuessCategory, GuessResult, REGION_DATA } from "./types";

// Contains the currently selected region
export const selectedRegion = writable(Region.Lcs);
// Guesses for each region
export const regionStores = new Map<number, Writable<Array<PlayerGuess>>>();

// unix time denoting next reset
export const resetTimeMillis = writable(1688114466000);

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
        value.push(new PlayerGuess([
            new PlayerGuessCategory(GuessCategory.Name, GuessResult.Incorrect, "aaa"),
            new PlayerGuessCategory(GuessCategory.Position, GuessResult.Incorrect, "Top"),
            new PlayerGuessCategory(GuessCategory.From, GuessResult.Correct, "N/A"),
            new PlayerGuessCategory(GuessCategory.FavoriteChamp, GuessResult.Incorrect, "s"),
            new PlayerGuessCategory(GuessCategory.Titles, GuessResult.Correct, "Titles"),
        ]));
        value.push(new PlayerGuess([
            new PlayerGuessCategory(GuessCategory.Name, GuessResult.Correct, "aaa"),
            new PlayerGuessCategory(GuessCategory.Position, GuessResult.Incorrect, "Top"),
            new PlayerGuessCategory(GuessCategory.From, GuessResult.Correct, "NA"),
            new PlayerGuessCategory(GuessCategory.FavoriteChamp, GuessResult.Incorrect, "s"),
            new PlayerGuessCategory(GuessCategory.Titles, GuessResult.Correct, "Titles"),
        ]));
        return value;
    });
}

createRegionStores();
