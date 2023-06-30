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
    pub fn id(&self) -> i32 {
        *self as i32
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

impl From<i32> for Region {
    fn from(value: i32) -> Self {
        Region::iter()
            .find(|region| region.id() == value)
            .unwrap_or(Self::default())
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum GuessCategory {
    Id = 0,
    Role = 1,
    Country = 2,
    FavoriteChamps = 3,
    Team = 4,
}

impl GuessCategory {
    pub fn id(&self) -> i32 {
        *self as i32
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct PlayerGuessCategory {
    pub category_id: i32,
    pub correct: bool,
    pub guess: String,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct PlayerGuess {
    pub categories: Vec<PlayerGuessCategory>,
}

impl PlayerGuess {
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
