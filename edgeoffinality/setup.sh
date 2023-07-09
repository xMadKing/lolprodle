#!/bin/bash

SCRIPT_DIR="$(dirname $0)" # directory where this file is
SCRIPT_USER="lolprodle_script_runner"
SCRIPT_CRONTAB_FILE="/internal_crontab_jobs" # in root directory

# change into the directory where this file is (makes it easier to reference files in this
# directory)
(cd "$SCRIPT_DIR") || (echo "could not change to directory $SCRIPT_DIR" && exit 1)

if [ "$(whoami)" != "root" ]; then
    echo "$0: this script must be run as the ROOT user!"
    exit 1
fi

# add script user and give sudo group (if the user does not exist already)
id -u "$SCRIPT_USER" &>/dev/null || (useradd "$SCRIPT_USER" && usermod -aG sudo "$SCRIPT_USER")

echo "generating crontab job file"
echo "30 23 * * * cd $SCRIPT_DIR && /usr/bin/python3 generate_players.py"
echo "30 23 * * * cd $SCRIPT_DIR && /usr/bin/python3 select_pod.py"
echo "all jobs:"
cat --number-nonblank "$SCRIPT_CRONTAB_FILE"

echo "updating crontab jobs (runner user = $SCRIPT_USER)"
cat $SCRIPT_CRONTAB_FILE | crontab -u $SCRIPT_USER -

echo "installing Python dependencies"
pip install -r ./requirements.txt

echo "Done!"
