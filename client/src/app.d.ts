// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type Client from "pocketbase";
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            pb: Client;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
