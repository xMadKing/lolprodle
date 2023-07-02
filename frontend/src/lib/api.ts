import type { PlayerGuess } from "./types";

export interface Player {
    id: string;
    name: string;
    role: string;
    team: string;
    country: string;
    fav_champs: Array<String>;
}

export enum ErrorType {
    Internal,
    NoRegionPlayersAvailable,
    NoRegionPodsAvailable,
    InvalidPlayerId,
    NoPod,
}

export interface ResultResponse<T> {
    success: boolean;
    error_type: ErrorType | null;
    error_message: string | null;
    data: T | null;
}

export interface ApiError {
    errorType: ErrorType | null;
    errorMessage: string | null;
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

//note: maybe in the future get it from the api server (just in case)
export function getCurrentDaystampMillis(): number {
    let now = Date.now();
    now -= (now % 86400000); // daystamp
    return now;
}

export async function postCheckGuess(region_id: number, player_id: string): Promise<CheckGuessResponse> {
    let req: CheckGuessRequest = { region_id, player_id };
    return fetch(
        "http://127.0.0.1:8000/v1/check_guess",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(req)
        }
    )
        .then(res => res.json())
        .then(json => json as CheckGuessResponse);
}

// This request should never error
export async function getResetTime(): Promise<ResultResponse<ResetTimeResponse>> {
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
        .then(json => json as ResultResponse<ResetTimeResponse>)
}

export async function fetchPlayerNames(region: number): Promise<PlayersResponse> {
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

export async function getPreviousPlayer(region: number): Promise<PreviousPlayerResponse> {
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
