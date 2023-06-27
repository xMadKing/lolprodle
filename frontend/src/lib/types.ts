export enum Region {
    Lcs = "LCS",
    Lec = "LEC",
    Lck = "LCK",
    Lpl = "LPL"
}

export enum GuessFieldType {
    // name of the player
    Name = "Player Name",
    // the position they play
    Position = "Position",
    // where they are from
    From = "From",
    // their favourite champ
    FavoriteChamp = "Favorite Champ",
    // the titles won
    Titles = "Titles"
}

export enum GuessStatus {
    Correct,
    Incorrect
}

export class GuessField {
    readonly fieldType: GuessFieldType;
    readonly status: GuessStatus;
    readonly guess: string;

    constructor(fieldType: GuessFieldType, status: GuessStatus, guess: string) {
        this.fieldType = fieldType;
        this.status = status;
        this.guess = guess;
    }
}

export class PlayerGuess {
    readonly guessFields: Array<GuessField>;

    constructor(guessFields: Array<GuessField>) {
        this.guessFields = guessFields;
    }
}
