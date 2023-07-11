#!/bin/bash
# uploads the scripts image to the deploy server

SCRIPT_DIR="$(dirname $0)" # directory where this file is

cd $SCRIPT_DIR
docker save -o ./scripts.tar scripts:latest
scp ./scripts.tar root@207.154.237.127:/
