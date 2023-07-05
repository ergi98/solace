<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";
    import AnimeComponent from "../AnimeComponent.svelte";
    import UnfavoriteButton from "../UnfavoriteButton.svelte";

    export let data: PageData;
</script>

<div class="mx-auto pt-4 pb-4">
    <h1 class="text-lg font-bold pb-4 w-fit">
        {data.anime.title.replace(":", "")}
    </h1>
    <AnimeComponent
        title={data.anime.title}
        mal_id={data.anime.mal_id.toString()}
        image={data.anime.images.webp.image_url}
    />
</div>

<div class="flex items-center gap-4">
    <a
        class="bg-neutral-300 hover:bg-neutral-400 hover:text-white transition-colors rounded uppercase text-sm p-4"
        href="/"
    >
        Go back to list
    </a>
    {#if data.favorites.has(data.anime.mal_id.toString())}
        <UnfavoriteButton mal_id={data.anime.mal_id.toString()} />
    {:else}
        <form action="?/addToFavorites" method="post" use:enhance>
            <input type="hidden" name="mal_id" value={data.anime.mal_id} />
            <input type="hidden" name="title" value={data.anime.title} />
            <input
                type="hidden"
                name="image"
                value={data.anime.images.webp.image_url}
            />
            <button
                class=" bg-yellow-500 hover:bg-yellow-600 hover:text-white transition-colors uppercase text-sm rounded p-4"
                type="submit"
            >
                Add to favorites
            </button>
        </form>
    {/if}
</div>
