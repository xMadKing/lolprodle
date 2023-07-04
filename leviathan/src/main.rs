use std::sync::Arc;

use data::service::{self, LolprodleDataService};
use lazy_static::lazy_static;

#[macro_use]
extern crate rocket;

pub mod cors;
pub mod data;
pub mod guess;
pub mod lolprodle;
pub mod v1;

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
        .mount("/", routes![cors::all_options])
        .mount(
            "/v1/",
            routes![
                v1::router::index,
                v1::router::check_guess,
                v1::router::reset_time,
                v1::router::players,
                v1::router::previous_player
            ],
        )
        .attach(cors::Cors)
        .launch()
        .await;
}
