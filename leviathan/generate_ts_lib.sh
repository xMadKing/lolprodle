#!/bin/bash
# generates a typescript library for this server

SCRIPT_DIR="$(dirname $0)" # directory where this file is

cd $SCRIPT_DIR
cargo test generate_openapi_spec

rm -r ../libs/leviathan-api/
openapi-generator-cli generate \
    -i target/testdir-current/leviathan/tests/generate_openapi_spec/openapi.json \
    -g typescript-fetch \
    -o ../libs/leviathan-api \
    --additional-properties=npmName=leviathan-api \
    --additional-properties=npmVersion=1.0.0 \
    --additional-properties=supportsES6=true
