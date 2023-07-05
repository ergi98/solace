<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import AnimeComponent from "./AnimeComponent.svelte";
    import UnfavoriteButton from "./UnfavoriteButton.svelte";
    export let data: LayoutData;
</script>

<div class="mx-auto flex md:flex-row flex-col-reverse justify-center max-w-5xl">
    <div class="mx-auto md:w-full w-auto px-4">
        <slot />
    </div>
    <div class="py-4 mx-auto h-fit md:w-full w-auto px-4">
        <h1 class="text-lg font-bold pb-4 w-fit">Favorites</h1>
        {#if data.favorites.size === 0}
            <div
                class="text-sm bg-neutral-100 px-2 py-4 rounded-md border-dashed border border-neutral-300 text-neutral-500 text-center"
            >
                You have not yet favorited any animes
            </div>
        {:else}
            <div
                class="px-4 flex flex-row gap-4 max-w-md overflow-auto overscroll-contain pb-2"
            >
                {#each [...data.favorites] as [key, value]}
                    <div class="flex-grow-1 md:flex-shrink-0">
                        <AnimeComponent
                            mal_id={key}
                            title={value.title}
                            image={value.image}
                        />
                        {#if data.favorites.has(key)}
                            <UnfavoriteButton mal_id={key} />
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
