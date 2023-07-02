<script lang="ts">
    import { GUESS_CATEGORY_DATA, type PlayerGuessCategory } from "$lib/types";

    export let guessCategory: PlayerGuessCategory;
</script>

<div
    class="card shadow-xl bg-green-500 border-2 border-base-100 hover:lg:transform hover:lg:-translate-y-2"
    class:bg-green-500={guessCategory.correct}
    class:bg-red-400={!guessCategory.correct}
>
    <div class="w-36 card-body text-black break-words">
        <h2 class="font-bold uppercase">
            {GUESS_CATEGORY_DATA.get(guessCategory.category_id)?.displayName}
        </h2>
        <p>{guessCategory.guess}</p>
    </div>
</div>
