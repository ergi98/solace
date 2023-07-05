<script lang="ts">
    export let title: string;
    export let mal_id: string;
    export let image: string;
</script>

<a
    href="/{mal_id}"
    class="block group relative rounded-md overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:cursor-pointer transition-all h-fit w-fit"
>
    <img alt={title} src={image} class=" object-cover w-52 aspect-photo" />
    <div
        class="absolute h-full w-full bg-gradient-to-b from-black/50 to-black/20 z-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2"
    >
        <p class="text-center text-white uppercase text-lg font-bold">
            {title}
        </p>
    </div>
</a>
