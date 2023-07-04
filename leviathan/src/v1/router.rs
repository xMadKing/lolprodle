use chrono::Utc;
use rocket::serde::json::Json;
use serde_json::Value;

use crate::{
    guess::{self, GuessState},
    lolprodle::{self, Region},
    DATA_SERVICE,
};

use super::{CheckGuessRequest, CheckGuessResponse, ErrorType, ResultResponse, ResetTimeResponse, PlayersResponse, PreviousPlayerResponse};

#[get("/")]
pub async fn index() -> Value {
    serde_json::json!({
        "value": "lolprodle - Leviathan API"
    })
}

#[post("/check_guess", data = "<request>")]
pub async fn check_guess(
    request: Json<CheckGuessRequest>,
) -> Json<ResultResponse<CheckGuessResponse>> {
    match guess::check_guess(Region::from(request.region_id), &request.player_id).await {
        Ok(player_guess) => Json(ResultResponse {
            success: true,
            data: Some(CheckGuessResponse {
                guess: player_guess,
            }),
            ..Default::default()
        }),

        Err(state) => {
            warn!("Error state for /check_guess: {}", state);
            Json(ResultResponse {
                success: false,
                error_type: Some(match state {
                    GuessState::InvalidName => ErrorType::InvalidPlayerId,
                    GuessState::NoCurrentPod => ErrorType::NoPod,
                    _ => ErrorType::Internal,
                }),
                ..Default::default()
            })
        }
    }
}

#[get("/reset_time")]
pub async fn reset_time() -> Json<ResultResponse<ResetTimeResponse>> {
    let next_daystamp = lolprodle::get_current_daystamp_millis() + lolprodle::DAY_MILLIS;
    let remaining_time = next_daystamp - Utc::now().timestamp_millis();

    Json(ResultResponse {
        success: true,
        data: Some(ResetTimeResponse {
            reset_time_unix_millis: next_daystamp,
            remaining_time_millis: remaining_time,
        }),
        ..Default::default()
    })
}

#[get("/players?<region_id>")]
pub async fn players(region_id: i32) -> Json<ResultResponse<PlayersResponse>> {
    let rg = Region::from(region_id);

    if let Some(arc) = DATA_SERVICE.get_region_players(&rg).await {
        let region_players = arc.read().await;
        return Json(ResultResponse {
            success: true,
            data: Some(PlayersResponse(
                region_players
                    .players
                    .iter()
                    .map(|player| player.id.clone())
                    .collect(),
            )),
            ..Default::default()
        });
    }

    Json(ResultResponse {
        success: false,
        error_type: Some(ErrorType::NoRegionPlayersAvailable),
        ..Default::default()
    })
}

#[get("/previous_player?<region_id>")]
pub async fn previous_player(region_id: i32) -> Json<ResultResponse<PreviousPlayerResponse>> {
    let rg = Region::from(region_id);
    let previous_daystamp = lolprodle::get_current_daystamp_millis() - lolprodle::DAY_MILLIS;

    if let Some(arc) = DATA_SERVICE.get_region_pods(&rg).await {
        let region_pods = arc.read().await;
        let prev_player = region_pods
            .get_pod_for_daystamp(previous_daystamp)
            .map(|pod| pod.player.clone());

        return match prev_player {
            Some(player) => Json(ResultResponse {
                success: true,
                data: Some(PreviousPlayerResponse { player }),
                ..Default::default()
            }),
            None => Json(ResultResponse {
                success: false,
                error_type: Some(ErrorType::NoPod),
                ..Default::default()
            }),
        };
    }

    Json(ResultResponse {
        success: false,
        error_type: Some(ErrorType::NoRegionPodsAvailable),
        ..Default::default()
    })
}
