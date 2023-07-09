import generate_players
import select_pod
import get_teams

def run():
    #Generating the _players files
    generate_players.generate_players(get_teams.get_lec_teams(), 'lec')
    generate_players.generate_players(get_teams.get_lck_teams(), 'lck')
    generate_players.generate_players(get_teams.get_lcs_teams(), 'lcs')
    generate_players.generate_players(get_teams.get_lpl_teams(), 'lpl')

    #Generating the _pods files (or selecting new if file exits)
    select_pod.select_pod('lec')
    select_pod.select_pod('lcs')
    select_pod.select_pod('lck')
    select_pod.select_pod('lpl')

run()