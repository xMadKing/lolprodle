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

export type PlayersResponse = Array<string>;

export interface PreviousPlayerResponse {
    player: Player;
}

export async function getResetTime(): Promise<ResetTimeResponse> {
    return fetch(
        "http://127.0.0.1:8000/v1/reset_time",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        }
    )
        .then(res => res.json())
        .then(json => json as ResetTimeResponse)
}

export async function fetchPlayerNames(region:number): Promise<PlayersResponse> {
    return fetch(
        `http://127.0.0.1:8000/v1/players?region_id=${region}`, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        }
    )
    .then(res => res.json())
    .then(json => json as PlayersResponse)
}

export async function fetchYstrPlayer(region:number): Promise<PreviousPlayerResponse> {
    return fetch(
        `http://127.0.0.1:8000/v1/previous_player?region_id=${region}`, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        }
    )
    .then(res => res.json())
    .then(json => json as PreviousPlayerResponse)
}
