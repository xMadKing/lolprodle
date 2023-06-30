use std::time::SystemTime;

use chrono::Utc;
use serde::{Deserialize, Serialize};
use strum::{EnumIter, IntoEnumIterator};

#[derive(Clone, Copy, Debug, Default, Serialize, Deserialize, EnumIter)]
pub enum Region {
    #[default]
    Lcs = 0,
    Lec = 1,
    Lck = 2,
    Lpl = 3,
}

impl Region {
    pub fn id(&self) -> u32 {
        *self as u32
    }

    pub fn name(&self) -> &'static str {
        match *self {
            Self::Lcs => "LCS",
            Self::Lec => "LEC",
            Self::Lck => "LCK",
            Self::Lpl => "LPL",
        }
    }
}

impl From<u32> for Region {
    fn from(value: u32) -> Self {
        Region::iter()
            .find(|region| region.id() == value)
            .unwrap_or(Self::default())
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum GuessCategory {
    Name,
    Position,
    From,
    FavoriteChamp,
    Team,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum GuessResult {
    Correct,
    Incorrect,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct PlayerGuessCategory {
    pub category: GuessCategory,
    pub result: GuessResult,
    pub guess: String,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct PlayerGuess {
    categories: Vec<PlayerGuessCategory>,
}

pub const DAY_MILLIS: i64 = 86400000;

pub fn get_current_daystamp_millis() -> i64 {
    let time = Utc::now().timestamp_millis();
    time - (time % DAY_MILLIS)
}
