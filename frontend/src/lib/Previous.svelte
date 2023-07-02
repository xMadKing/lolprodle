<script lang="ts">
    import background from "$lib/assets/pbackground.jpg";
    import { onMount, onDestroy } from "svelte";
    import { fetchYstrPlayer } from "./api";
    import { selectedRegion } from "./stores";

    let requester: NodeJS.Timer;
    let name = "";

    onMount(() => {
        // request time from api (every 5 mins)
        updateYstrPlayer(); // initial value
        requester = setInterval(updateYstrPlayer, 1000);
    });

    onDestroy(() => clearInterval(requester));

    function updateYstrPlayer() {
        fetchYstrPlayer($selectedRegion)
            .then((res) => {
                name = res.player.id;
            })
            .catch((err) => console.log(err));
    }
</script>

<div class="flex justify-center">
    <div class="card w-72 bg-base-200 image-full">
        <figure><img src={background} alt="LeagueImg" sizes="100" /></figure>
        <div class="card-body items-center">
            <h2 class="card-title">Yesterday's player was:</h2>
            {#if name == ''}
                <span class="loading loading-infinity loading-lg" />
			{:else}
				<b><p>{name}</p></b>
			{/if}
        </div>
    </div>
</div>
