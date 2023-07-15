import { getCurrentDaystampMillis, guessApi } from "$lib/api";
import { saveCorrectGuessCookie, } from "$lib/cookies";
import { correctGuess, currentGuesses } from "$lib/stores";
import type { Guess, Region } from "leviathan-api";

// Returns nothing (undefined) or the error type and message.
export async function makeGuess(region: Region, playerId: string): Promise<void> {
    return guessApi.checkGuess({
        region: region,
        playerId: playerId
    }).then(res => {
        currentGuesses.update(guesses => {
            guesses.push(res.guess);

            // removed for now (cookie gets too big, need better solution in the future)
            // let currentDaystamp = getCurrentDaystampMillis();
            // console.log(currentDaystamp);
            // saveGuessesCookie(region, currentDaystamp, guesses);

            return guesses;
        });

        checkCorrectAndUpdateStoreAndCookie(region, playerId, res.guess);

        return undefined;
    }).catch(err => err);
}

export function isGuessEntirelyCorrect(guess: Guess): boolean {
    return guess.categories.every(category => category.correct);
}

// Returns whether the provided player ID is the correct guess. Note that if the promise returns
// undefined, this is indicative of some sort of error that occurred while making the check guess
// request.
export async function verifyGuess(region: Region, playerId: string): Promise<boolean> {
    return guessApi.checkGuess({ region, playerId }).then(res => {
        return isGuessEntirelyCorrect(res.guess);
    })
}

// Will update the correct guess store if the provided guess is completely correct.
function checkCorrectAndUpdateStoreAndCookie(region: Region, playerId: string, guess: Guess) {
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
        guessApi.checkGuess({ region, playerId: guess }).then(res => {
            currentGuesses.update(g => {
                g.unshift(res.guess);
                return g;
            });
        });
    }
}
