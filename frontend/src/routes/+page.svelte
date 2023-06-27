<script>
	import Footer from "$lib/Footer.svelte";
	import Navbar from "$lib/Navbar.svelte";
	import Input from "$lib/Input.svelte";
	import RegionSelector from "$lib/RegionSelector.svelte";
	import HowToButton from "$lib/HowToButton.svelte";
	import Timer from "$lib/Timer.svelte";
	import Previous from "$lib/Previous.svelte";
</script>

<Navbar />

<RegionSelector />

<Previous />

<div class="flex items-center justify-center py-8">
	<Input />
	<HowToButton />
</div>

<Timer />

<Footer />
