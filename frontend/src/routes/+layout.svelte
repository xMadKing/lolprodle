<script>
    import Footer from "$lib/Footer.svelte";
    import Navbar from "$lib/Navbar.svelte";
    import "../app.css";
    import background from "$lib/assets/background.webp";
    import Settings from "$lib/Settings.svelte";
    import ToastHandler from "$lib/ToastHandler.svelte";
</script>

<svelte:head>
    <title>lolprodle - LoL Pro Wordle</title>
</svelte:head>

<div
    class="bg-no-repeat bg-cover"
    style="background-image: url({background}); background-attachment: fixed;"
>
    <Navbar />
    <Settings />

    <!-- opacity layer -->
    <div class="bg-gray-50 bg-opacity-20">
        <slot />
    </div>

    <ToastHandler />
</div>
<Footer />
