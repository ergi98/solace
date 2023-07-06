import { apiRequest } from "../lib/api.util";
import type { Actions, PageServerLoad } from "./$types";

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
    formAction: async ({ request }) => {
        const form = await request.formData();
        const id = form.get("id");

        return { id };
    },
} satisfies Actions;
