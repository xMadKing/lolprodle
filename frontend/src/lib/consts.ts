import Lcs from "$lib/assets/lcs_adj.svg";
import Lec from "$lib/assets/lec_adj.svg";
import Lck from "$lib/assets/lck_adj.svg";
import Lpl from "$lib/assets/lpl_adj.svg";
import type { GuessCategory, Region } from "leviathan-api";

export const DISCORD_URL = "https://discord.gg/U4BrAnGkgc";

export const REGION_DATA = new Map<Region, { name: string, slugs: (string)[], icon: string }>([
    ["Lcs", { name: "LCS", slugs: ["lcs", "/lcs"], icon: Lcs }],
    ["Lec", { name: "LEC", slugs: ["lec", "/lec"], icon: Lec }],
    ["Lck", { name: "LCK", slugs: ["lck", "/lck"], icon: Lck }],
    ["Lpl", { name: "LPL", slugs: ["lpl", "/lpl"], icon: Lpl }],
]);

export const GUESS_CATEGORY_DATA = new Map<GuessCategory, { displayName: string }>([
    ["Id", { displayName: "Player Name" }],
    ["Role", { displayName: "Role" }],
    ["Country", { displayName: "Country" }],
    ["FavoriteChamps", { displayName: "Favorite Champs" }],
    ["Team", { displayName: "Team" }],
]);
