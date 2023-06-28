<script>
    import Footer from "$lib/Footer.svelte";
    import Navbar from "$lib/Navbar.svelte";
    import Input from "$lib/Input.svelte";
    import RegionSelector from "$lib/RegionSelector.svelte";
    import HowToButton from "$lib/HowToButton.svelte";
    import Timer from "$lib/Timer.svelte";
    import Previous from "$lib/Previous.svelte";
    import GuessBox from "$lib/guess/GuessBox.svelte";
    import { onMount } from "svelte";
    import { REGION_DATA } from "$lib/types";
    import { selectedRegion } from "$lib/stores";
    import background from "$lib/assets/background.webp";

    // auto select region based on url
    onMount(() => {
        const urlComponents = window.location.href.split("#");
        if (urlComponents.length < 2) {
            return;
        }

        REGION_DATA.forEach((value, key) => {
            if (value.slugs.indexOf(urlComponents[1]) !== -1) {
                $selectedRegion = key;
                return;
            }
        });
    });
</script>

<div class="bg-no-repeat bg-cover" style="background-image: url({background});">
    <Navbar />
    <!-- opacity layer -->
    <div class="bg-gray-50 bg-opacity-20">
        <RegionSelector />
        <Previous />
        <div class="flex items-center justify-center pl-6 py-8">
            <Input />
            <HowToButton />
        </div>
        <GuessBox />
        <Timer />
    </div>
</div>
<Footer />
