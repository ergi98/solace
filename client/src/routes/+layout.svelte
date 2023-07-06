<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import AnimeComponent from "./AnimeComponent.svelte";
    export let data: LayoutData;
</script>

<div class="p-4 grid grid-cols-2">
    <div>
        <slot />
    </div>
    <div>
        {#each [...data.favorites] as [key, value]}
            <AnimeComponent
                title={value.title}
                mal_id={key}
                image={value.image}
            />
        {/each}
    </div>
</div>
