<script lang="ts">
    import { GuessResult, PlayerGuessCategory } from "$lib/types";

    export let guessCategory: PlayerGuessCategory;
</script>

{#if guessCategory.result === GuessResult.Correct}
<div class="card sm:w-20 xl:w-36 shadow-xl bg-green-500 border-base-100 hover:lg:transform hover:lg:-translate-y-2">
    <div class="card-body text-black">
        <h2 class="font-bold uppercase">{guessCategory.category}</h2>
        <p>{guessCategory.guess}</p>
    </div>
</div>
{:else}
<div class="card sm:w-20 xl:w-36 shadow-xl bg-red-400 border-2 border-base-100 hover:lg:transform hover:lg:-translate-y-2">
    <div class="card-body text-black">
        <h2 class="font-bold uppercase">{guessCategory.category}</h2>
        <p>{guessCategory.guess}</p>
    </div>
</div>
{/if}
