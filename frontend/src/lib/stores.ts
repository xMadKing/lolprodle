import { writable, type Writable } from "svelte/store";
import { Region, PlayerGuess, GuessField, GuessFieldType, GuessStatus } from "./types";

export const regionStores = new Map<string, Writable<Array<PlayerGuess>>>();

function createStores() {
    for (const region in Region) {
        // store the region values as the keys in regionStores
        regionStores.set(Object.values(Region)[Object.keys(Region).indexOf(region)], writable(new Array<PlayerGuess>()));
    }
    
    // dummy data
    regionStores.get("LCS")?.update((value) => {
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

createStores();
