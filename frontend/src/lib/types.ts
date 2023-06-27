export enum Region {
    Lcs = 0,
    Lec = 1,
    Lck = 2,
    Lpl = 3,
}

export const REGION_DATA = new Map<Region, { name: string, slugs: (string)[] }>([
    [Region.Lcs, { name: "LCS", slugs: ["lcs", "/lcs"] }],
    [Region.Lec, { name: "LEC", slugs: ["lec", "/lec"] }],
    [Region.Lck, { name: "LCK", slugs: ["lck", "/lck"] }],
    [Region.Lpl, { name: "LPL", slugs: ["lpl", "/lpl"] }],
]);

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
