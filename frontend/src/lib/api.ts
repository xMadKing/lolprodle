import { resetTimeMillis, toasts } from "./stores";
import { Toast, type PlayerGuess, ToastStatus } from "./types";

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

export function setup_reset_time_fetching() {
    setInterval(async () => {
        await fetch(
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
            .then(json => console.log(json))
            .catch(_err => {
                toasts.update(t => {
                    t.push(new Toast(
                        ToastStatus.Error,
                        "Something happened while getting the reset time",
                        Date.now() + 2000
                    ));
                    return t;
                });
            });
    }, 5000);
}


export function setup() {
    setInterval(() => {
        // fetch_data();
    }, 5000);
}
