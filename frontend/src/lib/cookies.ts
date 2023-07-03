import Cookies from "js-cookie";
import type { PlayerGuess, Region } from "./types";

export const GUESSES_COOKIE_ID_PREFIX = "guesses_"
export const GUESSED_NAMES_COOKIE_ID_PREFIX = "guessed_names_";

export interface GuessesCookie {
    daystamp: number; // in millis
    regionId: number;
    guesses: Array<PlayerGuess>;
}

export type GuessedNamesCookie = Array<string>;

export function getGuessesCookieId(region: Region, daystamp_millis: number): string {
    return `${GUESSES_COOKIE_ID_PREFIX}_${region}_${daystamp_millis}`;
}

export function saveGuessesCookie(region: Region, daystampMillis: number, guesses: Array<PlayerGuess>) {
    let cookie: GuessesCookie = {
        daystamp: daystampMillis,
        regionId: region,
        guesses: guesses,
    }

    // expires in 2 days
    Cookies.set(
        getGuessesCookieId(region, daystampMillis),
        JSON.stringify(cookie),
        { expires: 2, sameSite: "strict" }
    );
}

export function loadGuessesCookie(region: Region, daystampMillis: number): GuessesCookie | undefined {
    let cookie = Cookies.get(getGuessesCookieId(region, daystampMillis));
    if (cookie !== undefined) {
        return JSON.parse(cookie) as GuessesCookie;
    }

    return undefined;
}

export function getGuessedNamesCookieId(region: Region, daystamp_millis: number): string {
    return `${GUESSED_NAMES_COOKIE_ID_PREFIX}_${region}_${daystamp_millis}`;
}

export function saveGuessedNamesCookie(region: Region, daystampMillis: number, guessedNames: Array<string>) {
    let cookie: GuessedNamesCookie = guessedNames;

    // expires in 2 days
    Cookies.set(
        getGuessedNamesCookieId(region, daystampMillis),
        JSON.stringify(cookie),
        { expires: 2, sameSite: "strict" }
    );
}

export function loadGuessedNamesCookie(region: Region, daystampMillis: number): GuessedNamesCookie | undefined {
    let cookie = Cookies.get(getGuessedNamesCookieId(region, daystampMillis));
    if (cookie !== undefined) {
        return JSON.parse(cookie) as GuessedNamesCookie;
    }

    return undefined;
}
