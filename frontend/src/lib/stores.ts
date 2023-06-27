import { writable, type Writable } from "svelte/store";
import { Region, PlayerGuess, GuessField, GuessFieldType, GuessStatus, REGION_DATA } from "./types";

export const selectedRegion = writable(Region.Lcs);
export const regionStores = new Map<number, Writable<Array<PlayerGuess>>>();

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
            new GuessField(GuessFieldType.Name, GuessStatus.Incorrect, "aaa"),
            new GuessField(GuessFieldType.Position, GuessStatus.Incorrect, "Top"),
            new GuessField(GuessFieldType.From, GuessStatus.Correct, "N/A"),
            new GuessField(GuessFieldType.FavoriteChamp, GuessStatus.Incorrect, "s"),
            new GuessField(GuessFieldType.Titles, GuessStatus.Correct, "Titles"),
        ]));
        value.push(new PlayerGuess([
            new GuessField(GuessFieldType.Name, GuessStatus.Correct, "aaa"),
            new GuessField(GuessFieldType.Position, GuessStatus.Incorrect, "Top"),
            new GuessField(GuessFieldType.From, GuessStatus.Correct, "NA"),
            new GuessField(GuessFieldType.FavoriteChamp, GuessStatus.Incorrect, "s"),
            new GuessField(GuessFieldType.Titles, GuessStatus.Correct, "Titles"),
        ]));
        return value;
    });
}

createRegionStores();
