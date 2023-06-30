use chrono::Utc;
use rocket::{http::Status, serde::json::Json};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::{
    data::Player,
    lolprodle::{self, PlayerGuess, Region},
    DATA_SERVICE,
};

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct CheckGuessRequest {
    pub region: Region,
    pub player_name: String,
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
pub async fn check_guess(request: Json<CheckGuessRequest>) -> (Status, Json<PlayerGuess>) {
    todo!();
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

#[get("/players?<region>")]
pub async fn players(region: u32) -> (Status, Json<PlayersResponse>) {
    let rg = Region::from(region);

    if let Some(arc) = DATA_SERVICE.get_region_players(&rg).await {
        let region_players = arc.read().await;
        return (
            Status::Ok,
            Json(PlayersResponse(
                region_players
                    .players
                    .iter()
                    .map(|player| player.name.clone())
                    .collect(),
            )),
        );
    }

    (Status::NotFound, Json(PlayersResponse::default()))
}

#[get("/previous_player?<region>")]
pub async fn previous_player(region: u32) -> (Status, Json<PreviousPlayerResponse>) {
    let rg = Region::from(region);
    let previous_daystamp = lolprodle::get_current_daystamp_millis() - lolprodle::DAY_MILLIS;

    if let Some(arc) = DATA_SERVICE.get_region_pods(&rg).await {
        let region_pods = arc.read().await;
        let prev_player = region_pods
            .get_pod_for_daystamp(previous_daystamp)
            .map(|pod| pod.player)
            .unwrap_or(Player::default());

        return (
            Status::Ok,
            Json(PreviousPlayerResponse {
                player: prev_player,
            }),
        );
    }

    (Status::NotFound, Json(PreviousPlayerResponse::default()))
}
