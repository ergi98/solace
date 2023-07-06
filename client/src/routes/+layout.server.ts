import { favoriteRequest } from "$lib/api.util";

import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    const favorites = await favoriteRequest(locals.pb);
    return {
        favorites: favorites,
    };
}) satisfies LayoutServerLoad;
