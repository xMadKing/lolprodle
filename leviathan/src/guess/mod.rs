use strum::Display;

use crate::{
    data::Player,
    lolprodle::{self, GuessCategory, Guess, GuessCategoryResult, Region},
    DATA_SERVICE,
};

#[derive(Clone, Copy, Debug, Display)]
pub enum GuessState {
    NoRegionPlayers,
    NoRegionPods,
    NoCurrentPod,
    InvalidName,
}

pub async fn check_guess(region: Region, player_id: &str) -> Result<Guess, GuessState> {
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
pub fn compare_players(guess: &Player, real: &Player) -> Guess {
    let categories = vec![
        GuessCategoryResult {
            category: GuessCategory::Id,
            correct: guess.id == real.id,
            guess: guess.id.to_owned(),
        },
        GuessCategoryResult {
            category: GuessCategory::Role,
            correct: guess.role == real.role,
            guess: guess.role.to_owned(),
        },
        GuessCategoryResult {
            category: GuessCategory::Country,
            correct: guess.country == real.country,
            guess: guess.country.to_owned(),
        },
        GuessCategoryResult {
            category: GuessCategory::FavoriteChamps,
            correct: guess.fav_champs == real.fav_champs,
            guess: guess.fav_champs.join(", "),
        },
        GuessCategoryResult {
            category: GuessCategory::Team,
            correct: guess.team == real.team,
            guess: guess.team.to_owned(),
        },
    ];

    Guess { categories }
}
