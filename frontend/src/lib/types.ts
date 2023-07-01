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
    Role = "Role",
    // where they are from
    Country = "Country",
    // their favourite champ
    FavoriteChamps = "Favorite Champs",
    // the titles won
    Titles = "Titles"
}

export interface PlayerGuessCategory {
    category: GuessCategory;
    correct: boolean;
    guess: string;
}

export interface PlayerGuess {
    categories: Array<PlayerGuessCategory>;
}

export enum ToastStatus {
    Info,
    Success,
    Error
}

export class Toast {
    readonly status: ToastStatus;
    readonly message: string;
    readonly lifeEndTimeMillis: number; // unix time for when to hide

    constructor(status: ToastStatus, message: string, lifeEndTimeMillis: number) {
        this.status = status;
        this.message = message;
        this.lifeEndTimeMillis = lifeEndTimeMillis;
    }
}
