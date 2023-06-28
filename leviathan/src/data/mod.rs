use std::{env, fs, io, path::PathBuf};

use crate::lolprodle;

const CONTEXT_DIR_VAR: &str = "LOLPRODLE_CTX_DIR";

pub enum Error {
    NoContextEnvVar,
    InvalidDir { error: io::Error },
    IoError { error: io::Error },
}

pub struct LolprodleContextDir {
    pub files: Vec<PathBuf>,
}

impl LolprodleContextDir {
    pub fn get_region_players_file(&self, region: lolprodle::Region) -> Option<PathBuf> {
        let target_file = format!("{}_players.json", region.name().to_lowercase());
        self.get_file(target_file.as_str())
    }

    pub fn get_region_pod_file(&self, region: lolprodle::Region) -> Option<PathBuf> {
        let target_file = format!("{}_pod.json", region.name().to_lowercase());
        self.get_file(target_file.as_str())
    }

    pub fn get_file(&self, file_path: &str) -> Option<PathBuf> {
        self.files
            .iter()
            .find(|file| file.is_file() && file.file_name() == file_path)
    }
}

/// Gets all files from the context directory specified by the context directory environment
/// variable.
pub fn get_context_dir_files() -> Result<LolprodleContextDir, Error> {
    let path = env::vars()
        .find(|(var, val)| var == CONTEXT_DIR_VAR)
        .ok_or(Error::NoContextEnvVar)?;

    let entries = fs::read_dir(path).map_err(|e| match e.kind() {
        io::ErrorKind::NotFound | io::ErrorKind::NotADirectory => Error::InvalidDir { error: e },
        _ => Error::IoError { error: e },
    })?;

    let files = entries
        .filter_map(|val| {
            let entry = val.map_err(|e| Error::IoError { error: e })?;
            Some(entry.path())
        })
        .collect();

    Ok(LolprodleContextDir { files })
}

pub struct Player {
    pub id: String,
    pub name: String,
    pub role: String,
    pub team: String,
    pub country: String,
    pub fav_champs: Vec<String>,
}

pub struct RegionPlayers {
    pub region: lolprodle::Region,
    pub players: Vec<Player>,
}

/// Player of (the) day (Pod)
pub struct Pod {
    pub day_stamp_millis: u64,
    pub player: Player,
}

/// All player of the day (so far) for the region.
pub struct RegionPods {
    pub region: lolprodle::Region,
    /// It is expected pods will be a vector with unique entries, both in timestamp and players
    /// (that is to say, for any pod in the vector there will exist one and only one instance of
    /// that timestamp AND one and only one instance of that player [i.e., itself]). This
    /// essentially represents the singular player of the day for each day.
    pub pods: Vec<Pod>,
}

struct LolprodleDataLoader;

impl LolprodleDataLoader {
    //todo: cache for 5 mins
    pub fn get_region_players(
        ctx: &LolprodleContextDir,
        region: lolprodle::Region,
    ) -> Result<RegionPlayers, Error> {
        todo!()
    }
}
