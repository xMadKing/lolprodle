import consts
from mwrogue.esports_client import EsportsClient, json
from player import Player
import get_teams as get_teams


def generate_players(teams, region):
    site = EsportsClient("lol")
    players = {}

    for team in teams:
        results = site.cargo_client.query(
            tables="TournamentPlayers=T, Players=P",
            join_on="T.Team = P.Team",
            fields="P.ID, P.Name, T.Team, P.Role, P.Country, P.FavChamps",
            where='T.Player = P.ID AND P.Team = "{}" AND T.Team = "{}"'.format(
                team, team),
            having="P.Role = 'Mid' OR P.Role = 'Top' OR P.Role = 'Jungle' OR P.Role = 'Mid' OR P.Role = 'Bot' OR P.Role = 'Support'"
        )
        for i in results:
            if players.get(i["ID"], None) is None:
                players[i["ID"]] = Player(i['ID'], i['Name'], i['Role'], i['Team'], i['Country'], str(i['FavChamps']).split(','))

    with open(consts.get_players_file(region), "w") as output:
        all_players = [value.__dict__ for value in players.values()]
        output.write(json.dumps(all_players))
