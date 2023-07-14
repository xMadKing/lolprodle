use std::sync::Arc;

use data::service::{self, LolprodleDataService};
use lazy_static::lazy_static;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::v1::V1Doc;

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
        .mount("/", SwaggerUi::new("/swagger-ui/<_..>").url("/api-docs/openapi.json", V1Doc::openapi()))
        .attach(cors::Cors)
        .launch()
        .await;
}

#[cfg(test)]
mod tests {
    use std::fs;

    use testdir::testdir;
    use utoipa::OpenApi;

    use crate::v1::V1Doc;

    #[test]
    fn generate_openapi_spec() {
        let dir = testdir!();
        let file_path = dir.join("openapi.json");
        fs::write(&file_path, V1Doc::openapi().to_pretty_json().unwrap()).unwrap();
    }
}
