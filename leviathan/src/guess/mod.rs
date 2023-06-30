use strum::Display;

use crate::{
    data::Player,
    lolprodle::{self, GuessCategory, PlayerGuess, PlayerGuessCategory, Region},
    DATA_SERVICE,
};

#[derive(Clone, Copy, Debug, Display)]
pub enum GuessState {
    NoRegionPlayers,
    NoRegionPods,
    NoCurrentPod,
    InvalidName,
}

pub async fn check_guess(region: Region, player_id: &str) -> Result<PlayerGuess, GuessState> {
    if let Some(players_arc) = DATA_SERVICE.get_region_players(&region).await {
        let region_players = players_arc.read().await;
        if let Some(guessed_player) = region_players
            .players
            .iter()
            .find(|player| player.id == player_id)
        {
            if let Some(arc) = DATA_SERVICE.get_region_pods(&region).await {
                let region_pods = arc.read().await;
                let current_daystamp = lolprodle::get_current_daystamp_millis();

                if let Some(pod) = region_pods.get_pod_for_daystamp(current_daystamp) {
                    return Ok(compare_players(guessed_player, &pod.player));
                }

                return Err(GuessState::NoCurrentPod);
            }

            return Err(GuessState::NoRegionPods);
        }

        return Err(GuessState::InvalidName);
    }

    Err(GuessState::NoRegionPlayers)
}

/// Compares players only taking into account categories required for guessing (as defined by
/// crate::lolprodle::GuessCategory).
pub fn compare_players(guess: &Player, real: &Player) -> PlayerGuess {
    let categories = vec![
        PlayerGuessCategory {
            category_id: GuessCategory::Id.id(),
            correct: guess.id == real.id,
            guess: guess.name.to_owned(),
        },
        PlayerGuessCategory {
            category_id: GuessCategory::Role.id(),
            correct: guess.role == real.role,
            guess: guess.role.to_owned(),
        },
        PlayerGuessCategory {
            category_id: GuessCategory::Country.id(),
            correct: guess.country == real.country,
            guess: guess.country.to_owned(),
        },
        PlayerGuessCategory {
            category_id: GuessCategory::FavoriteChamps.id(),
            correct: guess.fav_champs == real.fav_champs,
            guess: guess.fav_champs.join(", "),
        },
        PlayerGuessCategory {
            category_id: GuessCategory::Team.id(),
            correct: guess.team == real.team,
            guess: guess.team.to_owned(),
        },
    ];

    PlayerGuess { categories }
}
