<script lang="ts">
    import type { PageData } from "./$types";
    import AnimeComponent from "./AnimeComponent.svelte";

    export let data: PageData;
</script>

<div class="md:overflow-auto max-h-screen overflow-none pr-2">
    <div class="sticky top-0 bg-white pt-4 z-50 w-full">
        <h1 class="text-lg font-bold pb-4 w-fit">Anime List</h1>
    </div>
    {#each data.recommended.data as recommendation}
        <div
            class="shadow-md p-4 mb-4 rounded-md border border-neutral-100 bg-white max-w-md"
        >
            <div class="flex justify-between gap-4 pb-4">
                {#each recommendation.entry as subRecommendation}
                    <AnimeComponent
                        title={subRecommendation.title}
                        mal_id={subRecommendation.mal_id.toString()}
                        image={subRecommendation.images.webp.image_url}
                    />
                {/each}
            </div>
            <div>
                <div class=" border-b pb-2 mb-2">
                    {#each recommendation.entry as subRecommendation}
                        <h1 class="font-medium text-neutral-900">
                            {subRecommendation.title.replace(":", "")}
                        </h1>
                    {/each}
                </div>
                <div class="text-neutral-700">
                    <p>
                        {recommendation.content}
                    </p>
                </div>
            </div>
        </div>
    {/each}
</div>
