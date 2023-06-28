use std::{env, fs, io, path::PathBuf};

const CONTEXT_DIR_VAR: &str = "LOLPRODLE_CTX_DIR";

pub enum Error {
    NoContextEnvVar,
    InvalidDir { error: io::Error },
    IoError { error: io::Error },
}

pub fn get_context_dir_files() -> Result<Vec<PathBuf>, Error> {
    let path = env::vars()
        .find(|(var, val)| var == CONTEXT_DIR_VAR)
        .ok_or(Error::NoContextEnvVar)?;

    let entries = fs::read_dir(path).map_err(|e| match e.kind() {
        io::ErrorKind::NotFound | io::ErrorKind::NotADirectory => Error::InvalidDir { error: e },
        _ => Error::IoError { error: e },
    })?;

    entries
        .filter_map(|val| {
            let entry = val.map_err(|e| Error::IoError { error: e })?;
            Some(entry.path())
        })
        .collect()
}
