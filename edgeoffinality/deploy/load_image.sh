#!/bin/bash
# load image on deploy server

echo "===== loading image ====="
docker load -i /scripts.tar
