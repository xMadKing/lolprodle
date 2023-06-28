pub enum Region {
    Lcs = 0,
    Lec = 1,
    Lck = 2,
    Lpl = 3,
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
