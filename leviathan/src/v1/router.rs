use std::str::FromStr;

use chrono::Utc;
use rocket::{http::Status, response::status, serde::json::Json};
use serde_json::Value;

use crate::{
    guess::{self, GuessState},
    lolprodle::{self, Region},
    DATA_SERVICE,
};

use super::{
    CheckGuessRequest, CheckGuessResponse, ErrorResponse, ErrorType, PlayersResponse,
    PreviousPlayerResponse, ResetTimeResponse,
};

#[utoipa::path(
    context_path = "/v1",
    tag = "guess",
    responses(
        (status = 200, description = "Simple API description")
    )
)]
#[get("/")]
pub async fn index() -> Value {
    serde_json::json!({
        "value": "lolprodle - Leviathan API"
    })
}

#[utoipa::path(
    context_path = "/v1",
    tag = "guess", // tag modifies which module this endpoint will be part of
    request_body = CheckGuessRequest,
    responses(
        (status = 200, description = "Check guess result", body = CheckGuessResponse),
        (status = 500, description = "Error", body = ErrorResponse)
    ),
)]
#[post("/check_guess", data = "<request>")]
pub async fn check_guess(
    request: Json<CheckGuessRequest>,
) -> Result<Json<CheckGuessResponse>, status::Custom<Json<ErrorResponse>>> {
    match guess::check_guess(request.region, &request.player_id).await {
        Ok(player_guess) => Ok(Json(CheckGuessResponse {
            guess: player_guess,
        })),

        Err(state) => {
            warn!("Error state for /check_guess: {}", state);
            Err(status::Custom(
                // might want to differentiate between client and server error in the future
                Status::InternalServerError,
                Json(ErrorResponse {
                    err_type: match state {
                        GuessState::InvalidName => ErrorType::InvalidPlayerId,
                        GuessState::NoCurrentPod => ErrorType::NoPod,
                        _ => ErrorType::Internal,
                    },
                    msg: None,
                }),
            ))
        }
    }
}

#[utoipa::path(
    context_path = "/v1",
    tag = "guess",
    responses(
        (status = 200, description = "The reset time", body = ResetTimeResponse)
    )
)]
#[get("/reset_time")]
pub async fn reset_time() -> Json<ResetTimeResponse> {
    let next_daystamp = lolprodle::get_current_daystamp_millis() + lolprodle::DAY_MILLIS;
    let remaining_time = next_daystamp - Utc::now().timestamp_millis();

    Json(ResetTimeResponse {
        reset_time_unix_millis: next_daystamp,
        remaining_time_millis: remaining_time,
    })
}

#[utoipa::path(
    context_path = "/v1",
    tag = "guess",
    params(
        ("region" = String, Query, description = "The region name. Refer to the Region schema.")
    ),
    responses(
        (status = 200, description = "The players for a region", body = PlayersResponse),
        (status = 500, description = "Error", body = ErrorResponse)
    )
)]
#[get("/players?<region>")]
pub async fn players(
    region: String,
) -> Result<Json<PlayersResponse>, status::Custom<Json<ErrorResponse>>> {
    let rg = Region::from_str(&region).map_err(|_| {
        status::Custom(
            Status::InternalServerError,
            Json(ErrorResponse {
                err_type: ErrorType::InvalidRegion,
                msg: None,
            }),
        )
    })?;

    if let Some(arc) = DATA_SERVICE.get_region_players(&rg).await {
        let region_players = arc.read().await;
        info!("players size = {}", region_players.players.len());
        return Ok(Json(PlayersResponse(
            region_players
                .players
                .iter()
                .map(|player| player.id.clone())
                .collect(),
        )));
    }

    Err(status::Custom(
        Status::InternalServerError,
        Json(ErrorResponse {
            err_type: ErrorType::NoRegionPlayersAvailable,
            msg: None,
        }),
    ))
}

#[utoipa::path(
    context_path = "/v1",
    tag = "guess",
    params(
        ("region" = String, Query, description = "The region name. Refer to the Region schema.")
    ),
    responses(
        (status = 200, description = "The previous player for a region", body = PreviousPlayerResponse),
        (status = 500, description = "Error", body = ErrorResponse)
    )
)]
#[get("/previous_player?<region>")]
pub async fn previous_player(
    region: String,
) -> Result<Json<PreviousPlayerResponse>, status::Custom<Json<ErrorResponse>>> {
    let rg = Region::from_str(&region).map_err(|_| {
        status::Custom(
            Status::InternalServerError,
            Json(ErrorResponse {
                err_type: ErrorType::InvalidRegion,
                msg: None,
            }),
        )
    })?;

    let previous_daystamp = lolprodle::get_current_daystamp_millis() - lolprodle::DAY_MILLIS;

    if let Some(arc) = DATA_SERVICE.get_region_pods(&rg).await {
        let region_pods = arc.read().await;
        let prev_player = region_pods
            .get_pod_for_daystamp(previous_daystamp)
            .map(|pod| pod.player.clone());

        return match prev_player {
            Some(player) => Ok(Json(PreviousPlayerResponse { player })),
            None => Err(status::Custom(
                Status::InternalServerError,
                Json(ErrorResponse {
                    err_type: ErrorType::NoPod,
                    msg: None,
                }),
            )),
        };
    }

    Err(status::Custom(
        Status::InternalServerError,
        Json(ErrorResponse {
            err_type: ErrorType::NoRegionPodsAvailable,
            msg: None,
        }),
    ))
}
