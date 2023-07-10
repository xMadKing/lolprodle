#!/bin/bash
# uploads the leviathan image to the deploy server

docker save -o ./leviathan.tar leviathan:latest
scp ./leviathan.tar root@207.154.237.127:/
