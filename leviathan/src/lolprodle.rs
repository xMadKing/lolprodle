use chrono::Utc;
use serde::{Deserialize, Serialize};
use strum::{EnumIter, EnumString};
use utoipa::ToSchema;

#[derive(
    Clone,
    Copy,
    Debug,
    Default,
    PartialEq,
    Eq,
    Hash,
    Serialize,
    Deserialize,
    EnumIter,
    EnumString,
    ToSchema,
)]
#[strum(ascii_case_insensitive)]
pub enum Region {
    #[default]
    Lcs,
    Lec,
    Lck,
    Lpl,
}

impl Region {
    pub fn name(&self) -> &'static str {
        match *self {
            Self::Lcs => "LCS",
            Self::Lec => "LEC",
            Self::Lck => "LCK",
            Self::Lpl => "LPL",
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, Serialize, Deserialize, EnumString, ToSchema)]
#[strum(ascii_case_insensitive)]
pub enum GuessCategory {
    Id,
    Role,
    Country,
    FavoriteChamps,
    Team,
}

#[derive(Clone, Debug, Serialize, Deserialize, ToSchema)]
pub struct GuessCategoryResult {
    pub category: GuessCategory,
    pub correct: bool,
    pub guess: String,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, ToSchema)]
pub struct Guess {
    pub categories: Vec<GuessCategoryResult>,
}

impl Guess {
    /// A guess is correct if all categories are correct.
    pub fn is_correct(&self) -> bool {
        self.categories.iter().all(|category| category.correct)
    }
}

pub const DAY_MILLIS: i64 = 86400000;

pub fn get_current_daystamp_millis() -> i64 {
    let time = Utc::now().timestamp_millis();
    time - (time % DAY_MILLIS)
}
