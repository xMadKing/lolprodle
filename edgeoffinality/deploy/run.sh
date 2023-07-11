#!/bin/bash
# run the image on the deploy server

echo "===== running image ====="
# note that the scripts are in the /scripts directory in the container
docker run \
    --name scripts \
    -v ${LOLPRODLE_CTX_DIR}:/lolprodle/ \
    -e LOLPRODLE_CTX_DIR=/lolprodle/ \
    -d \
    scripts
