#!/bin/bash
# this file is intended to be run every time the leviathan server needs to be run

SCRIPT_DIR="$(dirname $0)" # directory where this file is
VOLUME_NAME="lolprodle_ctx"

# change into the directory where this file is (makes it easier to reference files in this
# directory)
(cd "$SCRIPT_DIR") || (echo "could not change to directory $SCRIPT_DIR" && exit 1)

if [ -z "$LOLPRODLE_CTX_DIR" ]; then
    echo "LOLPRODLE_CTX_DIR env var is not set (ensure you run the root level setup.sh of this repo
before running this setup file), exiting..."
    exit 1
fi

# not needed
# if ! docker volume ls -q | grep -Fqx "$VOLUME_NAME"; then
#     echo "creating Docker volume"
# fi

echo "building image"
docker build -t leviathan:latest .

echo "running image"
docker run \
    --name leviathan \
    -v $(LOLPRODLE_CTX_DIR):/lolprodle \
    -e LOLPRODLE_CTX_DIR=/lolprodle \
    -p 8000:8000 \
    -d \
    leviathan
