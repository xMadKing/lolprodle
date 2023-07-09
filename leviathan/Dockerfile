#-------------------
#     build
#-------------------

FROM rust:1.70.0-alpine AS build

RUN apk add --no-cache musl-dev
WORKDIR /leviathan_build/
COPY . .
RUN cargo build --release

#-------------------
#     deploy
#-------------------
FROM alpine:latest

ENV LOLPRODLE_CTX_DIR="${LOLPRODLE_CTX_DIR}"

LABEL scope="lolprodle"

WORKDIR /lolprodle/
COPY --from=build /leviathan_build/target/release/leviathan .

CMD ["./leviathan"]
