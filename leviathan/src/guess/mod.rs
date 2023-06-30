use crate::{
    data::Player,
    lolprodle::{self, PlayerGuess, Region},
    DATA_SERVICE,
};

pub enum GuessState {
    CorrectGuess,
    IncorrectGuess,
    NoRegionPlayers,
    NoRegionPods,
    NoCurrentPod,
    InvalidName,
}

pub async fn check_guess(region: Region, name: &str) -> Result<PlayerGuess, GuessState> {
    if let Some(players_arc) = DATA_SERVICE.get_region_players(&region).await {
        let region_players = players_arc.read().await;
        if let Some(player) = region_players
            .players
            .iter()
            .find(|player| player.name == name)
        {
            if let Some(arc) = DATA_SERVICE.get_region_pods(&region).await {
                let region_pods = arc.read().await;
                let current_daystamp = lolprodle::get_current_daystamp_millis();
                if let Some(pod) = region_pods.get_pod_for_daystamp(current_daystamp) {

                }

                return Err(GuessState::NoCurrentPod)
            }

            return Err(GuessState::NoRegionPods)
        }

        return Err(GuessState::InvalidName);
    }

    Err(GuessState::NoRegionPlayers)
}

/// Compares players only taking into account categories required for guessing (as defined by
/// crate::lolprodle::GuessCategory).
pub fn compare_players(a: &Player, b: &Player) -> PlayerGuess {
    todo!();
}
