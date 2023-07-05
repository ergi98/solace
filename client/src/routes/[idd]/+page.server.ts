import { apiRequest } from "$lib/api.util";
import favorites from "$lib/data/favorites";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { z } from "zod";

const favoritesData = z.object({
    mal_id: z.string(),
    title: z.string(),
    image: z.string(),
});

const unfavoriteData = z.object({
    mal_id: z.string(),
});

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
        };
    };
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
        const form = Object.fromEntries(await request.formData());

        const parsed = favoritesData.safeParse(form);

        if (parsed.success) {
            favorites.set(parsed.data.mal_id, {
                title: parsed.data.title,
                image: parsed.data.image,
            });
            return { success: true };
        } else {
            throw error(400, { message: "Invalid form data" });
        }
    },
    removeFromFavorites: async ({ request }) => {
        const form = Object.fromEntries(await request.formData());

        const parsed = unfavoriteData.safeParse(form);

        if (parsed.success) {
            favorites.delete(parsed.data.mal_id);
            return { success: true };
        } else {
            throw error(400, { message: "Invalid form data" });
        }
    },
} satisfies Actions;
