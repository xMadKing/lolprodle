<script>
    import Particles from "svelte-particles";
    import confettiExplosion from "$lib/assets/confetti_explosion.json";
    import { loadFull } from "tsparticles";
    import { onDestroy, onMount } from "svelte";

    let particlesContainer = undefined;

    let timeout;
    onMount(async () => {
        timeout = setTimeout(() => {
            if (particlesContainer !== undefined) {
                particlesContainer.stop();
            }
        }, 3000);
    });

    onDestroy(() => clearTimeout(timeout));
    // force stop
    onDestroy(() => {
        if (particlesContainer !== undefined) {
            particlesContainer.stop();
        }
    });
    onDestroy(() => console.log("called"));

    function onParticlesLoaded(event) {
        particlesContainer = event.detail.particles;
        particlesContainer.start();
    }

    async function particlesInit(engine) {
        await loadFull(engine);
    }
</script>

<Particles options={confettiExplosion} on:particlesLoaded={onParticlesLoaded} {particlesInit} />
