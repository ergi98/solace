import favorites from "$lib/data/favorites";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {
    return {
        favorites: favorites,
    };
}) satisfies LayoutServerLoad;
