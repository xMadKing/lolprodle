import { ErrorType, getCurrentDaystampMillis, postCheckGuess, type CheckGuessResponse } from "$lib/api";
import { saveCorrectGuessCookie, saveGuessesCookie } from "$lib/cookies";
import { correctGuess, currentGuesses } from "$lib/stores";
import type { PlayerGuess, Region } from "$lib/types";

// Returns nothing (undefined) or the error type and message.
export async function makeGuess(region: Region, playerId: string): Promise<undefined | [ErrorType | null, string | null]> {
    return postCheckGuess(region, playerId).then(res => {
        if (res === undefined) {
            return [ErrorType.Internal, ""];
        }
        if (!res.success) {
            console.log("[GUESS] Error from check guess endpoint");
            return [res.error_type, res.error_message];
        }

        if (res.data === null) {
            console.log("[GUESS] No guess data available when data is expected");
            return [ErrorType.Internal, ""];
        }

        // we know res.data is for sure a value at this point
        // (need to cast to unknown first otherwise TypeScript thinks it's a mistake/error)
        let data = res.data as unknown as CheckGuessResponse;

        currentGuesses.update(guesses => {
            guesses.push(data.guess);

            // removed for now (cookie gets too big, need better solution in the future)
            // let currentDaystamp = getCurrentDaystampMillis();
            // console.log(currentDaystamp);
            // saveGuessesCookie(region, currentDaystamp, guesses);

            return guesses;
        });

        checkCorrectAndUpdateStoreAndCookie(region, playerId, data.guess);

        return undefined;
    });
}

export function isGuessEntirelyCorrect(guess: PlayerGuess): boolean {
    return guess.categories.every(category => category.correct);
}

// Returns whether the provided player ID is the correct guess. Note that if the promise returns
// undefined, this is indicative of some sort of error that occurred while making the check guess
// request.
export async function verifyGuess(region: Region, playerId: string): Promise<boolean | undefined> {
    return postCheckGuess(region, playerId).then(res => {
        if (!res.success || res.data === null) {
            return undefined;
        }

        let data = res.data as unknown as CheckGuessResponse;
        return isGuessEntirelyCorrect(data.guess);
    })
}

// Will update the correct guess store if the provided guess is completely correct.
function checkCorrectAndUpdateStoreAndCookie(region: Region, playerId: string, guess: PlayerGuess) {
    if (!isGuessEntirelyCorrect(guess)) {
        return;
    }

    correctGuess.set(playerId);
    let currentDaystamp = getCurrentDaystampMillis();
    saveCorrectGuessCookie(region, currentDaystamp, playerId);
}

// Loads all guesses from a string of guesses. Each guess hits the API to get information about the
// guess.
export function loadAllGuesses(region: Region, guesses: string[]) {
    // we loop through the guesses in reverse so that we insert data to the start of the
    // currentGuesses list, allowing us to keep the (approximate) order the user guessed in. the
    // order is approximate since the requests are made asynchronously.
    for (let i = guesses.length - 1; i >= 0; i--) {
        let guess = guesses[i];
        postCheckGuess(region, guess).then(res => {
            if (res === undefined) {
                console.log("[GUESS LOADER] Undefined response");
                return;
            }
            if (!res.success) {
                console.log(`[GUESS LOADER] Error from check guess endpoint: ${res.error_type}: ${res.error_message}`);
                return;
            }

            if (res.data === null) {
                console.log("[GUESS LOADER] No guess data available when data is expected");
                return;
            }

            let data = res.data as unknown as CheckGuessResponse;
            currentGuesses.update(g => {
                g.unshift(data.guess);
                return g;
            });
        });
    }
}
