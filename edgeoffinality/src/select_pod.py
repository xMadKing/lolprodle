import random
import json
import time
import os

CTX_dir = os.environ.get('LOLPRODLE_CTX_DIR')

#check if file exists
def check_file(path):
    return os.path.exists(path)

#calc UTC time like mr oopma loompa wants
def calc_time():
    day_time_millis = 86400000
    t_utc = int(time.time() * 1000)
    current_daystamp = t_utc - (t_utc % day_time_millis)
    
    return current_daystamp

#get number of players in each region
def get_len_players(region):
    if check_file("{0}/{1}_players.json".format(CTX_dir ,region)):
        with open("{0}/{1}_players.json".format(CTX_dir ,region), "r") as input:
            data = json.load(input)
            return len(data)
    else:
        return "File does not exist"

#check if its time to reset the _pod file
def check_data(region):
    if check_file("{0}/{1}_pods.json".format(CTX_dir ,region)):
        with open("{0}/{1}_pods.json".format(CTX_dir ,region), "r") as input:
            data = json.load(input)
            if len(data) >= get_len_players(CTX_dir ,region):
                return False
            else:
                return True
    else: 
        return False
    
#player of the day class
class Pod:
    def __init__(self, player):
        self.daystamp_millis = calc_time()
        self.player = player

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

#selecting the player of the day
def select_pod(region):
    players = []
    with open("{0}/{1}_players.json".format(CTX_dir ,region), "r") as input:
        players = json.load(input)

    pod_index = random.randint(0, len(players)-1)
    pod = Pod(players[pod_index])

    data = []
    if check_data(region):
        with open("{0}/{1}_pods.json".format(CTX_dir ,region), "r") as output:
            data = output.read()
            data = data[:len(data)-1]
        data = data + "," + str(pod.toJSON()) + "]"
        with open("{0}/{1}_pods.json".format(CTX_dir ,region), "w") as output:
            output.write(data)
    else:
        with open("{0}/{1}_pods.json".format(CTX_dir ,region), "w") as output:
            output.write("[")
            output.write(pod.toJSON())
            output.write("]")
    
    return "success"

