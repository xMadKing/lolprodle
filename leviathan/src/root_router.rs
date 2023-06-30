use chrono::Utc;
use rocket::{http::Status, serde::json::Json};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::{
    lolprodle::{self, PlayerGuess, Region},
    DATA_SERVICE,
};

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct CheckGuessRequest {
    pub region: Region,
    pub player_name: String,
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
    pub player_name: String,
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

    (Status::NotFound, Json(PlayersResponse(Vec::new())))
}

#[get("/previous_player?<region>")]
pub async fn previous_player(region: u32) -> Json<PreviousPlayerResponse> {
    Json(PreviousPlayerResponse {
        player_name: "dummy".to_string(),
    })
}
