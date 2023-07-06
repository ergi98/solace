import { error } from "@sveltejs/kit";
import { animeRequest } from "$lib/api.util";
import type { Actions, PageServerLoad } from "./$types";

import { z } from "zod";

const favoritesData = z.object({
    mal_id: z.string(),
    title: z.string(),
    image: z.string(),
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
    const anime = await animeRequest<Anime>(`anime/${id}`);
    return {
        anime: anime.data,
    };
}) satisfies PageServerLoad;

export const actions = {
    addToFavorites: async ({ locals, request }) => {
        const form = Object.fromEntries(await request.formData());

        const parsed = favoritesData.safeParse(form);

        if (parsed.success) {
            try {
                await locals.pb.collection("favorites").create({
                    ...parsed.data,
                });
                return { success: true };
            } catch (err) {
                throw new Error("Failed to favorite");
            }
        } else {
            throw error(400, { message: "Invalid form data" });
        }
    },
} satisfies Actions;
