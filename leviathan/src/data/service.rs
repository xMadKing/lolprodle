use std::{borrow::BorrowMut, collections::HashMap, sync::Arc, time::Duration};

use strum::IntoEnumIterator;
use tokio::{sync::RwLock, time};

use crate::lolprodle;

use super::{get_context_dir, LolprodleContextDir, LolprodleDataLoader, RegionPlayers, RegionPods};

pub struct LolprodleDataService {
    ctx_dir: Arc<RwLock<LolprodleContextDir>>,
    // region id => RegionPlayers
    region_players: RwLock<HashMap<u32, Arc<RwLock<RegionPlayers>>>>,
    // region id => RegionPods
    region_pods: RwLock<HashMap<u32, Arc<RwLock<RegionPods>>>>,
}

impl LolprodleDataService {
    pub fn new() -> Self {
        // The context directory is cached for the duration of the program (it should not change
        // throughout the lifetime of this program).
        Self {
            ctx_dir: Arc::new(RwLock::new(Self::load_ctx_dir())),
            region_players: Self::create_init_map(),
            region_pods: Self::create_init_map(),
        }
    }

    pub fn get_context_dir(&self) -> Arc<RwLock<LolprodleContextDir>> {
        self.ctx_dir.clone()
    }

    pub async fn get_region_players(
        &self,
        region: &lolprodle::Region,
    ) -> Option<Arc<RwLock<RegionPlayers>>> {
        let all_players = self.region_players.read().await;
        all_players
            .get(&region.id())
            .and_then(|val| Some(val.clone()))
    }

    pub async fn get_region_pods(
        &self,
        region: &lolprodle::Region,
    ) -> Option<Arc<RwLock<RegionPods>>> {
        let all_pods = self.region_pods.read().await;
        all_pods.get(&region.id()).and_then(|val| Some(val.clone()))
    }

    async fn load_region_players(&self) {
        let ctx_dir_lock = self.get_context_dir();
        let ctx_dir = ctx_dir_lock.read().await;

        for region in lolprodle::Region::iter() {
            let region_players =
                LolprodleDataLoader::get_region_players(&ctx_dir, &region).unwrap();
            let all_region_players = self.region_players.write().await;

            if let Some(arc) = all_region_players.get(&region.id()) {
                let mut current_region_players = arc.write().await;
                *current_region_players = region_players;
            }
        }
    }

    async fn load_region_pods(&self) {
        let ctx_dir_lock = self.get_context_dir();
        let ctx_dir = ctx_dir_lock.read().await;

        for region in lolprodle::Region::iter() {
            let region_pods = LolprodleDataLoader::get_region_pods(&ctx_dir, &region).unwrap();
            let all_region_pods = self.region_pods.write().await;

            if let Some(arc) = all_region_pods.get(&region.id()) {
                let mut current_region_pods = arc.write().await;
                *current_region_pods = region_pods;
            }
        }
    }

    fn load_ctx_dir() -> LolprodleContextDir {
        // panic and abort program immediately if there exists no context directory (can't
        // function without this)
        get_context_dir().unwrap()
    }

    /// Creates a map and adds all initial entries for every region.
    fn create_init_map<T: Default>() -> RwLock<HashMap<u32, Arc<RwLock<T>>>> {
        let mut map = HashMap::new();
        lolprodle::Region::iter().for_each(|region| {
            map.insert(region.id(), Arc::new(RwLock::new(T::default())));
        });

        RwLock::new(map)
    }
}

/// Start the update task for updating region players and pods.
pub async fn start(service: Arc<LolprodleDataService>) {
    tokio::task::spawn(async move {
        let mut interval = time::interval(Duration::from_secs(5 * 60)); // 5 mins
        loop {
            interval.tick().await;
            service.load_region_players().await;
            service.load_region_pods().await;
        }
    });
}
