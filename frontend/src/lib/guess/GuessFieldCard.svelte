<script lang="ts">
    import { GuessStatus, type GuessField } from "$lib/types";

    export let field: GuessField;

    const status = field.status === GuessStatus.Correct ? "success" : "error";
</script>

<div class="card w-36 shadow-xl bg-{status} border-2 border-base-100">
    <div class="card-body text-{status}-content">
        <h2 class="font-bold uppercase">{field.fieldType}</h2>
        <p>{field.guess}</p>
    </div>
</div>
