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

export enum GuessCategory {
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

export enum GuessResult {
    Correct,
    Incorrect
}

export class PlayerGuessCategory {
    readonly category: GuessCategory;
    readonly result: GuessResult;
    readonly guess: string;

    constructor(category: GuessCategory, result: GuessResult, guess: string) {
        this.category = category;
        this.result = result;
        this.guess = guess;
    }
}

export class PlayerGuess {
    readonly categories: Array<PlayerGuessCategory>;

    constructor(categories: Array<PlayerGuessCategory>) {
        this.categories = categories;
    }
}
