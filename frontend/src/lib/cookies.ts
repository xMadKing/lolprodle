import Cookies from "js-cookie";
import type { PlayerGuess, Region } from "./types";

export const GUESSES_COOKIE_ID_PREFIX = "guesses_"
export interface GuessesCookie {
    daystamp: number; // in millis
    region_id: number;
    guesses: Array<PlayerGuess>;
}

export function getGuessesCookieId(region: Region, daystamp_millis: number): string {
    return `${GUESSES_COOKIE_ID_PREFIX}_${region}_${daystamp_millis}`;
}

export function saveGuessesCookie(region: Region, daystamp_millis: number, guesses: Array<PlayerGuess>) {
    let cookie: GuessesCookie = {
        daystamp: daystamp_millis,
        region_id: region,
        guesses: guesses,
    }

    // expires in 2 days
    Cookies.set(
        getGuessesCookieId(region, daystamp_millis),
        JSON.stringify(cookie),
        { expires: 2, sameSite: 'strict' }
    );
}

export function loadGuessesCookie(region: Region, daystamp_millis: number): GuessesCookie | undefined {
    let cookie = Cookies.get(getGuessesCookieId(region, daystamp_millis));
    if (cookie !== undefined) {
        return JSON.parse(cookie) as GuessesCookie;
    }

    return undefined;
}
