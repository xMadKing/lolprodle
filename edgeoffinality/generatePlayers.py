from mwrogue.esports_client import EsportsClient
from PlayerClass import Player
import getTeams as getTeams

def generatePlayers(region):
    if region == 'lec':
        teams = getTeams.getLecTeams()
    elif region == 'lcs':
        teams = getTeams.getLcsTeams()
    elif region == "lck":
        teams = getTeams.getLckTeams()
    elif region == "lpl":
        teams = getTeams.getLplTeams()
    else:
        return "Unknown Region"

    site = EsportsClient("lol")
    response = []

    for team in teams:
        print(team)
        results = site.cargo_client.query(
            tables="Players",
            fields="ID, Name, Team, Role, Country, FavChamps",
            where='Team="{}"'.format(team),
            having="Role='Top' OR Role='Jungle' OR Role='Mid' OR Role='Bot' OR Role='Support'"
        )
        for i in results:
            response.append(Player(i['ID'], i['Name'], i['Role'], i['Team'], i['Country'], str(i['FavChamps']).split(',')).toJSON())

    with open('storage/{}_players.json'.format(region), 'w') as output:
        for player in response:
            output.write(player)
    
    return "success"

generatePlayers('lec')
generatePlayers('lcs')
generatePlayers('lck')
generatePlayers('lpl')
