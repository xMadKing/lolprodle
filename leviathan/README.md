# leviathan

lolprodle API server - serves the backbone of lolprodle.com

## Models

- Region = Lcs = 0 | Lec = 1 | Lck = 2 | Lpl = 3
- GuessCategory = Name | Position | From | FavoriteChamp | Titles
- GuessResult = Correct | Incorrect
- PlayerGuessCategory(category: GuessCategory, result: GuessResult, guess: String)
- PlayerGuess([PlayerGuessCategory])

## API Requests

### POST: /check_guess

Check the correctness of a guess

**BODY**: 
JSON payload: {region: number, player_name: String}

**RETURNS**: 
JSON payload: PlayerGuess

### GET: /reset_time

Get the time for when new players are chosen for the next day. This value applies to all regions.

**RETURNS**: 
JSON payload: {"reset_time_unix_millis": 10000000}

### GET: /players?region=<number>

Get all player names for a region. The frontend uses this for name auto completion.

**RETURNS**:
JSON payload: ["name1", "name2", ...]

### GET: /previous_player?region=<number>

Get the previous day's player.

**RETURNS**:
JSON payload: {"player_name": "name"}
