#!/bin/bash
# run the image on the deploy server

echo "===== running image ====="
# note that the /lolprodle directory in the container is where the executable is, so we cannot use
# that as the volume mount point (/lolprodle/ctx is fine though)
# 
# ROCKET_ENV needs to be production (since this will be running on the deploy server)
# ROCKET_ADDRESS needs to be 0.0.0.0, otherwise we won't be able to access the API externally
docker run \
    --name leviathan \
    -v ${LOLPRODLE_CTX_DIR}:/lolprodle/ctx \
    -e ROCKET_ENV=production \
    -e ROCKET_ADDRESS="0.0.0.0" \
    -e LOLPRODLE_CTX_DIR=/lolprodle/ctx \
    -p 8000:8000 \
    -d \
    leviathan
