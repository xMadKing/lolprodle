use serde::{Deserialize, Serialize};
use utoipa::{OpenApi, ToSchema};

use crate::{data::Player, lolprodle::{Guess, Region}};

pub mod router;

#[derive(OpenApi)]
#[openapi(
    paths(
        router::index,
        router::check_guess,
        router::reset_time,
        router::players,
        router::previous_player
    ),
    components(
        schemas(
            crate::data::Player,
            crate::lolprodle::Region,
            crate::lolprodle::GuessCategory,
            crate::lolprodle::GuessCategoryResult,
            crate::lolprodle::Guess,
            ErrorType,
            ErrorResponse,
            CheckGuessRequest,
            CheckGuessResponse,
            ResetTimeResponse,
            PlayersResponse,
            PreviousPlayerResponse,
        )
    )
)]
pub struct V1Doc;

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub enum ErrorType {
    Internal,
    NoRegionPlayersAvailable,
    NoRegionPodsAvailable,
    InvalidPlayerId,
    InvalidRegion,
    NoPod,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct ErrorResponse {
    pub err_type: ErrorType,
    pub msg: Option<String>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct CheckGuessRequest {
    pub region: Region,
    pub player_id: String,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct CheckGuessResponse {
    pub guess: Guess,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct ResetTimeResponse {
    pub reset_time_unix_millis: i64,
    /// Time left until reset_time_unix_millis
    pub remaining_time_millis: i64,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct PlayersResponse(Vec<String>);

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct PreviousPlayerResponse {
    pub player: Player,
}
