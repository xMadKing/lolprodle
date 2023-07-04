use serde::{Serialize, Deserialize};

use crate::{lolprodle::PlayerGuess, data::Player};

pub mod router;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ErrorType {
    Internal,
    NoRegionPlayersAvailable,
    NoRegionPodsAvailable,
    InvalidPlayerId,
    NoPod,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct ResultResponse<T> {
    pub success: bool,
    pub error_type: Option<ErrorType>,
    pub error_message: Option<String>,
    pub data: Option<T>,
}

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
