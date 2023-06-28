pub enum Region {
    Lcs = 0,
    Lec = 1,
    Lck = 2,
    Lpl = 3,
}

impl Region {
    pub fn id(&self) -> u32 {
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

pub enum GuessCategory {
    Name,
    Position,
    From,
    FavoriteChamp,
    Titles,
}

pub enum GuessResult {
    Correct,
    Incorrect,
}

pub struct PlayerGuessCategory {
    pub category: GuessCategory,
    pub result: GuessResult,
    pub guess: String,
}

pub struct PlayerGuess {
    categories: Vec<PlayerGuessCategory>,
}
