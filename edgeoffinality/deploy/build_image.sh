#!/bin/bash
# build the image locally

SCRIPT_DIR="$(dirname $0)" # directory where this file is

echo "===== building image ====="
docker build -t scripts:latest ${SCRIPT_DIR}/..
