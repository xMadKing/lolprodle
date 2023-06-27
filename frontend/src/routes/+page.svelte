<script>
	import Footer from "$lib/Footer.svelte";
	import Navbar from "$lib/Navbar.svelte";
	import Input from "$lib/Input.svelte";
	import RegionSelector from "$lib/RegionSelector.svelte";
	import HowToButton from "$lib/HowToButton.svelte";
	import Timer from "$lib/Timer.svelte";
	import Previous from "$lib/Previous.svelte";
    import GuessBox from "$lib/guess/GuessBox.svelte";
    import { Region } from "$lib/types";
</script>

<Navbar />

<RegionSelector />

<Previous />

<div class="flex items-center justify-center py-8">
	<HowToButton />
	<Input />
</div>

<GuessBox region={Region.Lcs}/>

<Timer />

<Footer />
