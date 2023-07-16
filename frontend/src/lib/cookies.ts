import Cookies from "js-cookie";
import type { Guess, Region } from "leviathan-api";

export const GUESSES_COOKIE_ID_PREFIX = "guesses_"
export const GUESSED_NAMES_COOKIE_ID_PREFIX = "guessed_names_";
export const CORRECT_GUESS_COOKIE_ID_PREFIX = "correct_guess_";

export interface GuessesCookie {
    daystamp: number; // in millis
    region: Region;
    guesses: Array<Guess>;
}

export type GuessedNamesCookie = Array<string>;

export type CorrectGuessCookie = string;

export function getGuessesCookieId(region: Region, daystamp_millis: number): string {
    return `${GUESSES_COOKIE_ID_PREFIX}${region}_${daystamp_millis}`;
}

export function saveGuessesCookie(region: Region, daystampMillis: number, guesses: Array<Guess>) {
    let cookie: GuessesCookie = {
        daystamp: daystampMillis,
        region: region,
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
    if (cookie === undefined) {
        return undefined;
    }

    return JSON.parse(cookie) as GuessesCookie;
}

export function removeGuessesCookie(region: Region, daystampMillis: number) {
    Cookies.remove(getGuessesCookieId(region, daystampMillis));
}

export function getGuessedNamesCookieId(region: Region, daystampMillis: number): string {
    return `${GUESSED_NAMES_COOKIE_ID_PREFIX}${region}_${daystampMillis}`;
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
    if (cookie === undefined) {
        return undefined;
    }

    return JSON.parse(cookie) as GuessedNamesCookie;
}

export function removeGuessedNamesCookie(region: Region, daystampMillis: number) {
    Cookies.remove(getGuessedNamesCookieId(region, daystampMillis));
}

export function getCorrectGuessCookieId(region: Region, daystampMillis: number): string {
    return `${CORRECT_GUESS_COOKIE_ID_PREFIX}${region}_${daystampMillis}`;
}

export function saveCorrectGuessCookie(region: Region, daystampMillis: number, guess: string) {
    let cookie: CorrectGuessCookie = guess;

    // expires in 2 days
    Cookies.set(
        getCorrectGuessCookieId(region, daystampMillis),
        JSON.stringify(cookie),
        { expires: 2, sameSite: "strict" }
    );
}

export function loadCorrectGuessCookie(region: Region, daystampMillis: number): CorrectGuessCookie | undefined {
    let cookie = Cookies.get(getCorrectGuessCookieId(region, daystampMillis));
    if (cookie === undefined) {
        return undefined;
    }

    return JSON.parse(cookie) as CorrectGuessCookie;
}

export function removeCorrectGuessCookie(region: Region, daystampMillis: number) {
    Cookies.remove(getCorrectGuessCookieId(region, daystampMillis));
}
