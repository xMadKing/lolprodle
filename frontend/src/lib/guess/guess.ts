import { ErrorType, getCurrentDaystampMillis, postCheckGuess, type CheckGuessResponse } from "$lib/api";
import { saveGuessesCookie } from "$lib/cookies";
import { currentGuesses } from "$lib/stores";
import type { Region } from "$lib/types";

// Returns nothing or the error type and message.
export function makeGuess(region: Region, player_id: string): void | [ErrorType, string] {
    postCheckGuess(region, player_id).then(res => {
        if (res === undefined) {
            return;
        }
        if (!res.success) {
            console.log("[GUESS] Error from check guess endpoint");
            return [res.error_type, res.error_message];
        }

        if (res.data === null) {
            console.log("[GUESS] No guess data available when data is expected");
            return;
        }

        // we know res.data is for sure a value at this point
        // (need to cast to unknown first otherwise TypeScript thinks it's a mistake/error)
        let data = res.data as unknown as CheckGuessResponse;

        currentGuesses.update(guesses => {
            guesses.push(data.guess);

            let current_daystamp = getCurrentDaystampMillis();
            console.log(current_daystamp);
            saveGuessesCookie(region, current_daystamp, guesses);

            return guesses;
        })
    });
}
