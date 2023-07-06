<script lang="ts">
    import type { PageData } from "./$types";
    import AnimeComponent from "./AnimeComponent.svelte";

    export let data: PageData;
</script>

{#each data.recommended.data as recommendation}
    <div class="grid grid-cols-2 border border-gray-800 rounded mb-4">
        <h1 class="col-span-2 p-2 border-b border-gray-800">
            {recommendation.content}
        </h1>
        {#each recommendation.entry as subRecommendation}
            <div class="p-2 text-xl font-bold mb-2">
                <AnimeComponent
                    title={subRecommendation.title}
                    mal_id={subRecommendation.mal_id}
                    image={subRecommendation.images.webp.image_url}
                />
            </div>
        {/each}
    </div>
{/each}
