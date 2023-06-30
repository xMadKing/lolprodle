use std::sync::Arc;

use data::service::{self, LolprodleDataService};
use lazy_static::lazy_static;

#[macro_use]
extern crate rocket;

pub mod data;
pub mod lolprodle;
pub mod root_router;

lazy_static! {
    static ref DATA_SERVICE: Arc<LolprodleDataService> = Arc::new(LolprodleDataService::new());
}

#[rocket::main]
async fn main() {
    service::start(DATA_SERVICE.clone());

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
