use std::sync::Arc;

use data::service::{self, LolprodleDataService};
use lazy_static::lazy_static;

#[macro_use]
extern crate rocket;

pub mod data;
pub mod guess;
pub mod lolprodle;
pub mod root_router;

lazy_static! {
    static ref DATA_SERVICE: Arc<LolprodleDataService> = Arc::new(LolprodleDataService::new());
}

fn init_logger() {
    env_logger::builder()
        .target(env_logger::Target::Stdout)
        .filter_level(log::LevelFilter::Debug)
        .init();
}

#[rocket::main]
async fn main() {
    init_logger();

    info!("Starting lolprodle services...");
    service::start(DATA_SERVICE.clone());
    info!("Started loprodle services");

    let _ = rocket::build()
        .mount(
            "/v1/",
            routes![
                root_router::index,
                root_router::check_guess,
                root_router::reset_time,
                root_router::players,
                root_router::previous_player
            ],
        )
        .launch()
        .await;
}
