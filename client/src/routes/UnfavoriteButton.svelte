<script lang="ts">
    import { enhance } from "$app/forms";

    export let id: string;
</script>

<form action="/?/removeFromFavorites" method="post" use:enhance>
    <input type="hidden" name="id" value={id} />
    <button
        class="bg-red-500 hover:bg-red-600 text-white uppercase text-sm rounded p-4"
        type="submit"
    >
        Remove from favorites
    </button>
</form>
