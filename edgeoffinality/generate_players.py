from mwrogue.esports_client import EsportsClient
from player import Player
import get_teams as get_teams


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

    with open('storage/{}_players.json'.format(region), 'w') as output:
        output.write('[')
        for i in range(len(response)):
            output.write(response[i])
            if i != len(response)-1:
                output.write(',\n')
        output.write(']')

    return "success"


generate_players(get_teams.get_lec_teams(), 'lec')
generate_players(get_teams.get_lck_teams(), 'lck')
generate_players(get_teams.get_lcs_teams(), 'lcs')
generate_players(get_teams.get_lpl_teams(), 'lpl')
