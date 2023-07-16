import { env } from "$env/dynamic/public";
import { Configuration, GuessApi } from "leviathan-api";

const API_URL = env.PUBLIC_API_URL;

const config = new Configuration({
    basePath: API_URL,
});
export const guessApi = new GuessApi(config);

//note: maybe in the future get it from the api server (just in case)
export function getCurrentDaystampMillis(): number {
    let now = Date.now();
    now -= (now % 86400000); // daystamp
    return now;
}
