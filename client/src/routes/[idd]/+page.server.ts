import { apiRequest } from "$lib/api.util";
import favorites from "$lib/data/favorites";
import type { Actions, PageServerLoad } from "./$types";

export type Anime = {
    data: {
        mal_id: number;
        title: string;
        url: string;
        images: {
            webp: {
                image_url: string;
                small_image_url: string;
                large_image_url: string;
            };
        }
    }
};

export const load = (async ({ params }) => {
    const id = params.idd;
    const anime = await apiRequest<Anime>(`anime/${id}`);
    return {
        anime: anime.data,
    };
}) satisfies PageServerLoad;

export const actions = {
    addToFavorites: async ({ request }) => {
        const form = await request.formData();

        const mal_id = form.get("mal_id") as unknown as number;
        const title = form.get("title") as unknown as string;
        const image = form.get("image") as unknown as string;

        favorites.set(mal_id, { title: title, image: image });

        return { success: true };
    },
} satisfies Actions;
