use std::{env, fs, io, path::PathBuf};

use crate::lolprodle;

const CONTEXT_DIR_VAR: &str = "LOLPRODLE_CTX_DIR";

pub enum Error {
    NoContextEnvVar,
    InvalidDir { error: io::Error },
    IoError { error: io::Error },
}

pub struct ContextDirFiles {
    pub files: Vec<PathBuf>,
}

impl ContextDirFiles {
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

pub fn get_context_dir_files() -> Result<ContextDirFiles, Error> {
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

    Ok(ContextDirFiles { files })
}
