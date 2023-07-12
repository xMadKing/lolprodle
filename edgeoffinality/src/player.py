from dataclasses import dataclass
import json
import html
from typing import List


@dataclass
class Player:
    id: str
    name: str
    role: str
    team: str
    country: str
    fav_champs: List[str]

    def __init__(self, id, name, role, team, country, fav_champs):
        self.id = id
        self.name = html.unescape(html.unescape(name)) #???? idek why we need to unscape twice, but this fixs the issue of unscaped names
        self.role = role
        self.team = team
        self.country = country
        self.fav_champs = fav_champs

    def toJSON(self) -> str:
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    
