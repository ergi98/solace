import favorites from "$lib/data/favorites";
import { apiRequest } from "../lib/api.util";
import type { Actions, PageServerLoad } from "./$types";

import { error } from "@sveltejs/kit";

import { z } from "zod";

const unfavoriteData = z.object({
    mal_id: z.string(),
});

type RecommendedAnime = {
    data: {
        content: string;
        entry: {
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
        }[];
    }[];
};

export const load = (async () => {
    const recommended = await apiRequest<RecommendedAnime>(
        "recommendations/anime",
    );
    return {
        recommended: recommended,
    };
}) satisfies PageServerLoad;

export const actions = {
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
