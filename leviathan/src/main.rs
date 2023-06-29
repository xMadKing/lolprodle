#[macro_use]
extern crate rocket;

pub mod data;
pub mod lolprodle;
pub mod root_router;

#[launch]
fn rocket() -> _ {
    rocket::build().mount(
        "/v1/",
        routes![
            root_router::index,
            root_router::check_guess,
            root_router::reset_time,
            root_router::players,
            root_router::previous_player
        ],
    )
}
