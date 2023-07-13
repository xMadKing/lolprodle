import os

REGIONS = ["lcs", "lec", "lck", "lpl"]
REGION_TEAMS = {
    "lcs": [
        "100 Thieves",
        "Cloud9",
        "Dignitas",
        "Evil Geniuses.NA",
        "FlyQuest",
        "Golden Guardians",
        "Immortals",
        "NRG",
        "Team Liquid",
        "TSM"
    ],
    "lec": [
        "G2 Esports",
        "Fnatic",
        "Team BDS",
        "Team Heretics",
        "Team Vitality",
        "Astralis",
        "Excel",
        "KOI (Spanish Team)",
        "MAD Lions",
        "SK Gaming"
    ],
    "lck": [
        "Dplus KIA",
        "DRX",
        "Gen.G",
        "Hanwha Life Esports",
        "KT Rolster",
        "Kwangdong Freecs",
        "Liiv SANDBOX",
        "Nongshim RedForce",
        "OKSavingsBank BRION",
        "T1"
    ],
    "lpl": [
        "Anyone's Legend",
        "Bilibili Gaming",
        "EDward Gaming",
        "FunPlus Phoenix",
        "Invictus Gaming",
        "JD Gaming",
        "LGD Gaming",
        "LNG Esports",
        "Ninjas in Pyjamas.CN",
        "Oh My God",
        "Rare Atom",
        "Royal Never Give Up",
        "Team WE",
        "Top Esports",
        "ThunderTalk Gaming",
        "Ultra Prime",
        "Weibo Gaming"
    ]
}

DAY_MILLIS = 86400000

_LOLPRODLE_CTX_DIR_ENV_VAR = "LOLPRODLE_CTX_DIR"

CTX_DIR = None

def load_consts():
    globals()["CTX_DIR"] = os.environ.get(_LOLPRODLE_CTX_DIR_ENV_VAR)
    if CTX_DIR is None:
        raise Exception(f"Could not find {_LOLPRODLE_CTX_DIR_ENV_VAR} env var")


def get_players_file(region: str) -> str:
    return "{0}/{1}_players.json".format(CTX_DIR, region)


def get_pods_file(region: str) -> str:
    return "{0}/{1}_pods.json".format(CTX_DIR, region)
