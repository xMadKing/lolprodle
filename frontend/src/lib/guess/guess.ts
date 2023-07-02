import { getCurrentDaystampMillis, postCheckGuess } from "$lib/api";
import { saveGuessesCookie } from "$lib/cookies";
import { currentGuesses } from "$lib/stores";
import type { Region } from "$lib/types";

export function makeGuess(region: Region, player_id: string) {
    postCheckGuess(region, player_id).then(res => {
        if (res === undefined) {
            return;
        }

        currentGuesses.update(guesses => {
            guesses.push(res.guess);

            let current_daystamp = getCurrentDaystampMillis();
            console.log(current_daystamp);
            saveGuessesCookie(region, current_daystamp, guesses);

            return guesses;
        })
    });
}
