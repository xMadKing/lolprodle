use std::{env, fs, io, path::PathBuf};

use serde::{Deserialize, Serialize};

use crate::lolprodle;

pub mod service;

const CONTEXT_DIR_VAR: &str = "LOLPRODLE_CTX_DIR";

#[derive(Debug)]
pub enum Error {
    NoContextEnvVar,
    NoContextDir,
    NoFile { message: String },
    InvalidDir { error: io::Error },
    IoError { error: io::Error },
    ParseError { error: serde_json::Error },
}

pub struct LolprodleContextDir {
    pub files: Vec<PathBuf>,
}

impl LolprodleContextDir {
    pub fn get_region_players_file(&self, region: &lolprodle::Region) -> Option<&PathBuf> {
        let target_file = format!("{}_players.json", region.name().to_lowercase());
        self.get_file(target_file.as_str())
    }

    pub fn get_region_pods_file(&self, region: &lolprodle::Region) -> Option<&PathBuf> {
        let target_file = format!("{}_pod.json", region.name().to_lowercase());
        self.get_file(target_file.as_str())
    }

    pub fn get_file(&self, file_name: &str) -> Option<&PathBuf> {
        self.files
            .iter()
            .find(|file| file.is_file() && file.file_name().is_some_and(|name| name == file_name))
    }
}

/// Gets all files from the context directory specified by the context directory environment
/// variable.
pub fn get_context_dir() -> Result<LolprodleContextDir, Error> {
    let path = env::vars()
        .find(|(var, _val)| var == CONTEXT_DIR_VAR)
        .ok_or(Error::NoContextEnvVar)?;

    let entries = fs::read_dir(path.1).map_err(|e| match e.kind() {
        io::ErrorKind::NotFound => Error::InvalidDir { error: e },
        _ => Error::IoError { error: e },
    })?;

    let files = entries
        .filter_map(|val| {
            if let Ok(entry) = val {
                return Some(entry.path());
            }

            None
        })
        .collect();

    Ok(LolprodleContextDir { files })
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct Player {
    pub id: String,
    pub name: String,
    pub role: String,
    pub team: String,
    pub country: String,
    pub fav_champs: Vec<String>,
}

#[derive(Clone, Debug, Default)]
pub struct RegionPlayers {
    pub region: lolprodle::Region,
    pub players: Vec<Player>,
}

/// Player of (the) day (Pod)
#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct Pod {
    pub daystamp_millis: i64,
    pub player: Player,
}

/// All player of the day (so far) for the region.
#[derive(Clone, Debug, Default)]
pub struct RegionPods {
    pub region: lolprodle::Region,
    /// It is expected pods will be a vector with unique entries, both in timestamp and players
    /// (that is to say, for any pod in the vector there will exist one and only one instance of
    /// that timestamp AND one and only one instance of that player [i.e., itself]). This
    /// essentially represents the singular player of the day for each day.
    pub pods: Vec<Pod>,
}

impl RegionPods {
    pub fn get_pod_for_daystamp(&self, daystamp_millis: i64) -> Option<&Pod> {
        self.pods
            .iter()
            .find(|pod| pod.daystamp_millis == daystamp_millis)
    }

    pub fn get_pod_for_daystamp_cloned(&self, daystamp_millis: i64) -> Option<Pod> {
        self.get_pod_for_daystamp(daystamp_millis).cloned()
    }
}

pub struct LolprodleDataLoader;

impl LolprodleDataLoader {
    pub fn get_region_players(
        ctx: &LolprodleContextDir,
        region: &lolprodle::Region,
    ) -> Result<RegionPlayers, Error> {
        let players_file = ctx.get_region_players_file(region).ok_or(Error::NoFile {
            message: format!("Could not find players file for region: {}", region.name()),
        })?;
        let content = fs::read(players_file).map_err(|e| Error::IoError { error: e })?;

        let players: Vec<Player> = serde_json::from_slice(content.as_slice())
            .map_err(|e| Error::ParseError { error: e })?;

        Ok(RegionPlayers {
            region: region.clone(),
            players,
        })
    }

    pub fn get_region_pods(
        ctx: &LolprodleContextDir,
        region: &lolprodle::Region,
    ) -> Result<RegionPods, Error> {
        let pods_file = ctx.get_region_pods_file(region).ok_or(Error::NoFile {
            message: format!("Could not find pods file for region: {}", region.name()),
        })?;
        let content = fs::read(pods_file).map_err(|e| Error::IoError { error: e })?;

        let pods: Vec<Pod> = serde_json::from_slice(content.as_slice())
            .map_err(|e| Error::ParseError { error: e })?;

        Ok(RegionPods {
            region: region.clone(),
            pods,
        })
    }
}
