# lolprodle

Wordle inspired (browser) game... except you will be guessing the League of Legends Pro of the day!

Check out the live version: https://lolprodle.com

Currently supports 4 regions:
- LCS
- LEC
- LCK
- LPL

## Project Structure

lolprodle is broken up into 3 parts:
- [frontend](./frontend/) - contains the frontend (website) code [TypeScript +
  Svelte]
- [leviathan](./leviathan/) - contains the server code for API requests [Rust +
  Rocket]
- [edgeoffinality](./edgeoffinality) - contains scripts to fetch players from
  Leaguepedia + selecting the player of the day [Python]
