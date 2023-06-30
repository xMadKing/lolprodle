<script>
    import Footer from "$lib/Footer.svelte";
    import Navbar from "$lib/Navbar.svelte";
    import Input from "$lib/Input.svelte";
    import RegionSelector from "$lib/RegionSelector.svelte";
    import HowToButton from "$lib/HowToButton.svelte";
    import Timer from "$lib/Timer.svelte";
    import Previous from "$lib/Previous.svelte";
    import GuessBox from "$lib/guess/GuessBox.svelte";
    import background from "$lib/assets/background.webp";
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
