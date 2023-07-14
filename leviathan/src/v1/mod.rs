use serde::{Serialize, Deserialize};
use utoipa::{ToSchema, OpenApi};

use crate::{lolprodle::PlayerGuess, data::Player};

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
            crate::lolprodle::GuessCategory,
            crate::lolprodle::PlayerGuessCategory,
            crate::lolprodle::PlayerGuess,
            ErrorType,
            ResultResponse<CheckGuessRequest>,
            ResultResponse<CheckGuessResponse>,
            ResultResponse<ResetTimeResponse>,
            ResultResponse<PlayersResponse>,
            ResultResponse<PreviousPlayerResponse>,
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
    NoPod,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct ResultResponse<T> {
    pub success: bool,
    pub error_type: Option<ErrorType>,
    pub error_message: Option<String>,
    pub data: Option<T>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct CheckGuessRequest {
    pub region_id: i32,
    pub player_id: String,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct CheckGuessResponse {
    pub guess: PlayerGuess,
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
