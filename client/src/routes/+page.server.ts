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
    const recommended = await animeRequest<RecommendedAnime>(
        "recommendations/anime",
    );
    let favorites = [];

    try {
        favorites = structuredClone(
            await locals.pb
                .collection("favorites")
                .getFullList({ sort: "-created" }),
        ) as Record[];
    } catch (err) {
        throw new Error(`Failed to fetch favorites`);
    }

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
}) satisfies PageServerLoad;

export const actions = {
    removeFromFavorites: async ({ locals, request }) => {
        const form = Object.fromEntries(await request.formData());

        const parsed = unfavoriteData.safeParse(form);

        if (parsed.success) {
            try {
                await locals.pb.collection("favorites").delete(parsed.data.id);
                return { success: true };
            } catch (err) {
                throw new Error(`Failed to remove from favorites`);
            }
        } else {
            throw error(400, { message: "Invalid form data" });
        }
    },
} satisfies Actions;
