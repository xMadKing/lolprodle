<script lang="ts">
    import { GUESS_CATEGORY_DATA } from "$lib/consts";
    import type { PlayerGuessCategory } from "$lib/types";

    export let guessCategory: PlayerGuessCategory;

    $: categoryClasses = guessCategory.correct ? 
        "bg-gradient-to-br from-green-500 to-green-700" :
        "bg-gradient-to-br from-red-400 to-red-500";
</script>

<div
    class="card shadow-xl bg-green-500 border-2 border-base-100 hover:lg:transform
    hover:lg:-translate-y-2 {categoryClasses}"

>
    <div class="w-36 card-body text-black break-words">
        <h2 class="font-bold uppercase">
            {GUESS_CATEGORY_DATA.get(guessCategory.category_id)?.displayName}
        </h2>
        <p>{guessCategory.guess}</p>
    </div>
</div>
