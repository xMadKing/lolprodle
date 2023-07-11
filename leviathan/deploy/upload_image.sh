#!/bin/bash
# uploads the leviathan image to the deploy server

SCRIPT_DIR="$(dirname $0)" # directory where this file is

cd $SCRIPT_DIR
docker save -o ./leviathan.tar leviathan:latest
scp ./leviathan.tar root@207.154.237.127:/
