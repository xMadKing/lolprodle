from mwrogue.esports_client import EsportsClient
from player import Player
import get_teams as get_teams

def generate_players(teams, region):

    site = EsportsClient("lol")
    response = []

    for team in teams:
        results = site.cargo_client.query(
            tables="Players",
            fields="ID, Name, Team, Role, Country, FavChamps, IsSubstitute",
            where='Team="{}"'.format(team) + " AND IsSubstitute = 0",
            having="Role='Top' OR Role='Jungle' OR Role='Mid' OR Role='Bot' OR Role='Support'"
        )
        for i in results:
            response.append(Player(i['ID'], i['Name'], i['Role'], i['Team'], i['Country'], str(i['FavChamps']).split(',')).toJSON())

    with open('storage/{}_players.json'.format(region), 'w') as output:
        output.write('[')
        for i in range(len(response)):
            output.write(response[i])
            if i != len(response)-1:
                output.write(',\n')
        output.write(']')
    
    return "success"

generate_players(get_teams.get_lec_teams(), 'lec')
generate_players(get_teams.get_lcs_teams(), 'lcs')
generate_players(get_teams.get_lck_teams(), 'lck')
generate_players(get_teams.get_lpl_teams(), 'lpl')
