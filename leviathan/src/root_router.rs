use chrono::Utc;
use log::warn;
use rocket::{http::Status, serde::json::Json};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::{
    data::Player,
    guess,
    lolprodle::{self, PlayerGuess, Region},
    DATA_SERVICE,
};

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct CheckGuessRequest {
    pub region_id: i32,
    pub player_id: String,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct CheckGuessResponse {
    pub guess: PlayerGuess,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct ResetTimeResponse {
    pub reset_time_unix_millis: i64,
    /// Time left until reset_time_unix_millis
    pub remaining_time_millis: i64,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct PlayersResponse(Vec<String>);

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct PreviousPlayerResponse {
    pub player: Player,
}

#[get("/")]
pub async fn index() -> Value {
    serde_json::json!({
        "value": "lolprodle - Leviathan API"
    })
}

#[post("/check_guess", data = "<request>")]
pub async fn check_guess(request: Json<CheckGuessRequest>) -> (Status, Json<CheckGuessResponse>) {
    match guess::check_guess(Region::from(request.region_id), &request.player_id).await {
        Ok(player_guess) => (
            Status::Ok,
            Json(CheckGuessResponse {
                guess: player_guess,
            }),
        ),
        Err(status) => {
            warn!("Error status for /check_guess: {}", status);
            (
                Status::InternalServerError,
                Json(CheckGuessResponse::default()),
            )
        }
    }
}

#[get("/reset_time")]
pub async fn reset_time() -> (Status, Json<ResetTimeResponse>) {
    let next_daystamp = lolprodle::get_current_daystamp_millis() + lolprodle::DAY_MILLIS;
    let remaining_time = next_daystamp - Utc::now().timestamp_millis();

    (
        Status::Ok,
        Json(ResetTimeResponse {
            reset_time_unix_millis: next_daystamp,
            remaining_time_millis: remaining_time,
        }),
    )
}

#[get("/players?<region_id>")]
pub async fn players(region_id: i32) -> (Status, Json<PlayersResponse>) {
    let rg = Region::from(region_id);

    if let Some(arc) = DATA_SERVICE.get_region_players(&rg).await {
        let region_players = arc.read().await;
        return (
            Status::Ok,
            Json(PlayersResponse(
                region_players
                    .players
                    .iter()
                    .map(|player| player.id.clone())
                    .collect(),
            )),
        );
    }

    (Status::NotFound, Json(PlayersResponse::default()))
}

#[get("/previous_player?<region_id>")]
pub async fn previous_player(region_id: i32) -> (Status, Json<PreviousPlayerResponse>) {
    let rg = Region::from(region_id);
    let previous_daystamp = lolprodle::get_current_daystamp_millis() - lolprodle::DAY_MILLIS;

    if let Some(arc) = DATA_SERVICE.get_region_pods(&rg).await {
        let region_pods = arc.read().await;
        let prev_player = region_pods
            .get_pod_for_daystamp(previous_daystamp)
            .map(|pod| pod.player.clone());

        return match prev_player {
            Some(player) => (Status::Ok, Json(PreviousPlayerResponse { player })),
            None => (Status::NotFound, Json(PreviousPlayerResponse::default())),
        };
    }

    (Status::NotFound, Json(PreviousPlayerResponse::default()))
}
