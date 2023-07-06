// import getFavorites from "$lib/data/favorites";
import type { Record } from "pocketbase";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    try {
        const favorites = structuredClone(
            await locals.pb.collection("favorites").getFullList({ sort: "-created" }),
        ) as Record[];

        const favMap = new Map();

        favorites.forEach((fav) => {
            favMap.set(fav.mal_id, {
                id: fav.id,
                title: fav.title,
                image: fav.image,
            });
        });
        return {
            favorites: favMap,
        };
    } catch (err) {
        console.log(err)
        throw new Error(`Failed to fetch favorites`);
    }
}) satisfies LayoutServerLoad;
