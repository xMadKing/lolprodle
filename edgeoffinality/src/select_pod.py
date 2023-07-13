from typing import Any, Dict, List

import consts
from dataclasses import dataclass
import random
import json
import time

from player import Player


# player of the day
@dataclass
class Pod:
    daystamp_millis: int
    player: Player

    def __init__(self, daystamp_millis: int, player: Player):
        self.daystamp_millis = daystamp_millis
        self.player = player

    def toJSON(self) -> str:
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def to_dict(self) -> Dict[str, Any]:
        d = self.__dict__
        if isinstance(self.player, Player):
            d["player"] = self.player.__dict__

        return d


# calc UTC time
def get_next_daystamp() -> int:
    t_utc = int(time.time() * 1000)
    current_daystamp = t_utc - (t_utc % consts.DAY_MILLIS)
    
    return current_daystamp + consts.DAY_MILLIS


# check if its time to reset the _pod file
def pods_require_reset(region_players: List[Player], region_pods: List[Pod]) -> bool:
    return len(region_pods) >= len(region_players)


def select_pod(region: str):
    """Selects the player of the day.

    This function will write data out to the associated player of the day (pod) file for the region.
    The pod file may be reset if the number of players in it is greater than or equal to the number
    of players available for the region.

    Raises:
        FileNotFoundError: if the pod file could not be found
    """
    # load region players
    players: List[Player] = []
    with open(consts.get_players_file(region), "r") as file:
        content = "\n".join(file.readlines())
        players_json_array = json.loads(content)
        players = [Player(**player_dict) for player_dict in players_json_array]

    # load region pods
    pods: List[Pod] = []
    try:
        with open(consts.get_pods_file(region), "r") as file:
            content = "\n".join(file.readlines())
            pods_json_array = json.loads(content)
            pods = [Pod(**pod_dict) for pod_dict in pods_json_array]
    except FileNotFoundError:
        # new region pods file needs to be created in this case
        pass
        

    # select random player
    # we want the next day's timestamp since these scripts run at 11:30 PM UTC
    pod_index = random.randint(0, len(players) - 1)
    pod = Pod(get_next_daystamp(), players[pod_index])

    if pods_require_reset(players, pods):
        pods.clear()

    pods.append(pod)
    
    with open(consts.get_pods_file(region), "w") as file:
        pods_dicts = [pod.to_dict() for pod in pods]
        json_str = json.dumps(pods_dicts)
        file.write(json_str)
