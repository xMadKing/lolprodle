import Lcs from "$lib/assets/lcs_adj.svg";
import Lec from "$lib/assets/lec_adj.svg";
import Lck from "$lib/assets/lck_adj.svg";
import Lpl from "$lib/assets/lpl_adj.svg";
import { GuessCategory, Region } from "./types";

export const DISCORD_URL = "https://discord.gg/U4BrAnGkgc";

export const REGION_DATA = new Map<Region, { name: string, slugs: (string)[], icon: string }>([
    [Region.Lcs, { name: "LCS", slugs: ["lcs", "/lcs"], icon: Lcs }],
    [Region.Lec, { name: "LEC", slugs: ["lec", "/lec"], icon: Lec }],
    [Region.Lck, { name: "LCK", slugs: ["lck", "/lck"], icon: Lck }],
    [Region.Lpl, { name: "LPL", slugs: ["lpl", "/lpl"], icon: Lpl }],
]);

export const GUESS_CATEGORY_DATA = new Map<GuessCategory, { displayName: string }>([
    [GuessCategory.Id, { displayName: "Player Name" }],
    [GuessCategory.Role, { displayName: "Role" }],
    [GuessCategory.Country, { displayName: "Country" }],
    [GuessCategory.FavoriteChamps, { displayName: "Favorite Champs" }],
    [GuessCategory.Team, { displayName: "Team" }],
]);
