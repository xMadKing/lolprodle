import { resetTimeMillis } from "./stores";
import type { PlayerGuess } from "./types";

export interface Player {
    id: string;
    name: string;
    role: string;
    team: string;
    country: string;
    fav_champs: Array<String>;
}

export interface CheckGuessRequest {
    region_id: number;
    player_id: string;
}

export interface CheckGuessResponse {
    guess: PlayerGuess;
}

export interface ResetTimeResponse {
    reset_time_unix_millis: number;
    remaining_time_millis: number;
}

export type PlayersResponse = Array<String>;

export interface PreviousPlayerResponse {
    player: Player;
}

function fetch_data(){
    let response = fetch('http://127.0.0.1:8000/v1/reset_time').then((x) => x.json());
    console.log(response)
    return 
}


export function setup(){
    setInterval(() => {
        fetch_data();
    }, 5000);
}
