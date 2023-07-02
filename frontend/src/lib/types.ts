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
    Name = 0,
    // the position they play
    Role = 1,
    // where they are from
    Country = 2,
    // their favourite champ
    FavoriteChamps = 3,
    // the titles won
    Titles = 4
}

export const GUESS_CATEGORY_DATA = new Map<GuessCategory, { displayName: string }>([
    [GuessCategory.Name, { displayName: "Player Name" }],
    [GuessCategory.Role, { displayName: "Role" }],
    [GuessCategory.Country, { displayName: "Country" }],
    [GuessCategory.FavoriteChamps, { displayName: "Favorite Champs" }],
    [GuessCategory.Titles, { displayName: "Titles" }],
]);

export interface PlayerGuessCategory {
    category_id: GuessCategory;
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
    readonly durationMillis: number; // unix time for when to hide

    constructor(status: ToastStatus, message: string, durationMillis: number) {
        this.status = status;
        this.message = message;
        this.durationMillis = durationMillis;
    }
}

export class Duration {
    static secs(secs: number): number {
        return secs * 1000;
    }

    static mins(mins: number): number {
        return mins * this.secs(60);
    }
}
