import random
import json
from datetime import  datetime
from datetime import date
import os

class Pod:
    def __init__(self, player):
        self.time_stamp_millis = calc_time()
        self.player = player

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

def check_file(path):
    return os.path.exists(path)

def calc_time():
    today = date.today()
    dt = datetime(today.year, today.month, today.day, 0, 0)
    epoch_time = datetime(1970, 1, 1)

    return int((dt - epoch_time).total_seconds()*1000)

def select_pod(region):
    players = []
    with open("storage/{}_players.json".format(region), "r") as input:
        players = json.load(input)

    pod_index = random.randint(0, len(players)-1)
    pod = Pod(players[pod_index])

    if check_file("storage/{}_pod.json".format(region)):
        print("file exists")
        data = []
        with open("storage/{}_pod.json".format(region), "r") as output:
            data = output.read()
            data = data[:len(data)-1]
        data = data + "," + str(pod.toJSON()) + "]"
        with open("storage/{}_pod.json".format(region), "w") as output:
            output.write(data)
    else:
        print("file exists not")
        with open("storage/{}_pod.json".format(region), "w") as output:
            output.write("[")
            output.write(pod.toJSON())
            output.write("]")
    
    return "success"

select_pod('lck')

