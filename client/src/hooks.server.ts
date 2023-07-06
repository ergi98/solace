import type { RequestEvent, ResolveOptions } from "@sveltejs/kit";
import type { MaybePromise } from "@sveltejs/kit/types/private";
import PocketBase from "pocketbase";

type Input = {
    event: RequestEvent;
    resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>;
};

export async function handle(input: Input): Promise<Response> {
    input.event.locals.pb = new PocketBase("http://172.19.0.2:8080");

    const response = await input.resolve(input.event);

    return response;
}
