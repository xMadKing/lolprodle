import consts
import generate_players
import select_pod

def run():
    consts.load_consts()

    for region in consts.REGIONS:
        # generate the players file
        generate_players.generate_players(consts.REGION_TEAMS[region], region)

        # generate the pods file (or select new pod if file exists)
        select_pod.select_pod(region)


run()
