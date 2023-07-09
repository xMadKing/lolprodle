from mwrogue.esports_client import EsportsClient
from player import Player
import get_teams as get_teams
import os


CTX_dir = os.environ.get('LOLPRODLE_CTX_DIR')

def generate_players(teams, region):

    site = EsportsClient("lol")
    response = []

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
            if response.__contains__(Player(i['ID'], i['Name'], i['Role'], i['Team'], i['Country'], str(i['FavChamps']).split(',')).toJSON()):
                pass
            else:
                response.append(Player(i['ID'], i['Name'], i['Role'], i['Team'], i['Country'], str(
                    i['FavChamps']).split(',')).toJSON())

    with open('{0}/{1}_players.json'.format(CTX_dir, region), 'w') as output:
        output.write('[')
        for i in range(len(response)):
            output.write(response[i])
            if i != len(response)-1:
                output.write(',\n')
        output.write(']')

    return "success"

