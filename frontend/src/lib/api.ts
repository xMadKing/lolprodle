import { env } from "$env/dynamic/public";
import { GuessApi, ServerConfiguration, createConfiguration } from "leviathan-api";

const API_URL = env.PUBLIC_API_URL;

const server = new ServerConfiguration(API_URL, {});
export const guessApi = new GuessApi(createConfiguration({ baseServer: server }));

//note: maybe in the future get it from the api server (just in case)
export function getCurrentDaystampMillis(): number {
    let now = Date.now();
    now -= (now % 86400000); // daystamp
    return now;
}
