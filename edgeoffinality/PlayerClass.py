import json

class Player:
    def __init__(self, id, name, role, team, country, fav_champs):
        self.name = name
        self.role = role
        self.team = team
        self.id = id
        self.country = country
        self.fav_champs = fav_champs

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
    