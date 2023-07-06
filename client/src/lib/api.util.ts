export async function apiRequest<T>(url: string, options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: string;
}): Promise<T> {
    const res = await fetch("https://api.jikan.moe/v4/" + url, options);

    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}, received ${res.status}`);
    }

    if (res.status === 204) {
        return {} as T;
    }

    try {
        return await res.json() as T;
    } catch (err) {
        throw new Error(`Failed to parse JSON response from ${url}`);
    }
}
