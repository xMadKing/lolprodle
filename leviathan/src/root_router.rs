use rocket::{
    http::{ContentType, Status},
    response::status,
    serde::json::Json,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::lolprodle::{PlayerGuess, Region};

#[get("/")]
pub async fn index() -> Value {
    serde_json::json!({
        "value": "lolprodle - Leviathan API"
    })
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct CheckGuessRequest {
    pub region: Region,
    pub player_name: String,
}

#[post("/check_guess", data = "<request>")]
pub async fn check_guess(request: Json<CheckGuessRequest>) -> (Status, Json<PlayerGuess>) {
    todo!();
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct ResetTimeResponse {
    pub reset_time_unix_millis: i64,
}

#[get("/reset_time")]
pub async fn reset_time() -> (Status, Json<ResetTimeResponse>) {
    (
        Status::Ok,
        Json(ResetTimeResponse {
            reset_time_unix_millis: 1000000,
        }),
    )
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct PlayersResponse(Vec<String>);

#[get("/players?<region>")]
pub async fn players(region: u32) -> Json<PlayersResponse> {
    Json(PlayersResponse(vec!["dummy".to_string(), "dummy2".to_string()]))
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct PreviousPlayerResponse {
    pub player_name: String,
}

#[get("/previous_player?<region>")]
pub async fn previous_player(region: u32) -> Json<PreviousPlayerResponse> {
    Json(PreviousPlayerResponse { player_name: "dummy".to_string() })
}
