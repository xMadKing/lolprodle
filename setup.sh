#!/bin/bash
# contains general setup

SCRIPT_DIR="$(dirname $0)" # directory where this file is
CTX_DIR="/lolprodle"

# change into the directory where this file is (makes it easier to reference files in this
# directory)
(cd "$SCRIPT_DIR") || (echo "could not change to directory $SCRIPT_DIR" && exit 1)

if [ "$(whoami)" != "root" ]; then
    echo "$0: this script must be run as the ROOT user!"
    exit 1
fi

timedatectl set-timezone UTC

if [ ! -d "$CTX_DIR" ]; then
    echo "creating context dir: $CTX_DIR"
    mkdir "$CTX_DIR"
fi

if [ -z "$LOLPRODLE_CTX_DIR" ]; then
    echo "LOLPRODLE_CTX_DIR does not exist; permanently setting LOLPRODLE_CTX_DIR env var in /etc/profile.d/lolprodle.sh"
    echo "export LOLPRODLE_CTX_DIR=\"$CTX_DIR\"">/etc/profile.d/lolprodle.sh # we can completely override this file (since we own it)
    . /etc/profile.d/lolprodle.sh # source that file
fi
