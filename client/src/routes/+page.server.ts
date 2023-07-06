import type { Record } from "pocketbase";
import { animeRequest } from "../lib/api.util";
import type { Actions, PageServerLoad } from "./$types";

import { error } from "@sveltejs/kit";

import { z } from "zod";

const unfavoriteData = z.object({
    id: z.string(),
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

export const load = (async ({ locals }) => {
    try {
        const recommended = await animeRequest<RecommendedAnime>(
            "recommendations/anime",
        );
        const favorites = structuredClone(
            await locals.pb.collection("favorites").getFullList(),
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
            recommended: recommended,
        };
    } catch (err) {
        throw new Error(`Failed to fetch favorites`);
    }
}) satisfies PageServerLoad;

export const actions = {
    removeFromFavorites: async ({ locals, request }) => {
        const form = Object.fromEntries(await request.formData());

        const parsed = unfavoriteData.safeParse(form);

        if (parsed.success) {
            try {
                // favorites.delete(parsed.data.mal_id);
                await locals.pb.collection("favorites").delete(parsed.data.id);
            } catch (err) {
                throw new Error(`Failed to remove from favorites`);
            }
            return { success: true };
        } else {
            throw error(400, { message: "Invalid form data" });
        }
    },
} satisfies Actions;
