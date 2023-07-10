#!/bin/bash
# build the image

SCRIPT_DIR="$(dirname $0)" # directory where this file is

echo "===== building image ====="
docker build -t leviathan:latest ${SCRIPT_DIR}/..
