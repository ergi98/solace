import type { Record } from "pocketbase";
import type Client from "pocketbase";

export async function animeRequest<T>(
    url: string,
    options?: {
        method?: "GET" | "POST" | "PUT" | "DELETE";
        body?: string;
    },
): Promise<T> {
    const res = await fetch("https://api.jikan.moe/v4/" + url, options);

    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}, received ${res.status}`);
    }

    if (res.status === 204) {
        return {} as T;
    }

    try {
        return (await res.json()) as T;
    } catch (err) {
        throw new Error(`Failed to parse JSON response from ${url}`);
    }
}

type Favorites = Map<string, { id: string; title: string; image: string }>;

export async function favoriteRequest(pb: Client): Promise<Favorites> {
    try {
        const favorites = structuredClone(
            await pb.collection("favorites").getFullList({ sort: "-created" }),
        ) as Record[];

        const map = new Map();

        favorites.forEach((fav) => {
            map.set(fav.mal_id, {
                id: fav.id,
                title: fav.title,
                image: fav.image,
            });
        });

        return map as Favorites;
    } catch (err) {
        throw new Error(`Failed to fetch favorites`);
    }
}
