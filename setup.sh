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

LOLPRODLE_CTX_DIR_ENV_VAR="LOLPRODLE_CTX_DIR"
if [ -z "$LOLPRODLE_CTX_DIR_ENV_VAR" ]; then
    echo "$LOLPRODLE_CTX_DIR_ENV_VAR does not exist; permanently setting $LOLPRODLE_CTX_DIR_ENV_VAR env var in /etc/environment"
    echo "export $LOLPRODLE_CTX_DIR_ENV_VAR=\"$CTX_DIR\"">>/etc/environment
fi
