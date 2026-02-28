// Re-export common dependencies to centralize updates and utilize Deno caching effectively

// Discordeno
export * as discordeno from "https://deno.land/x/discordeno@18.0.1/mod.ts";

// PostgreSQL
export { Client } from "https://deno.land/x/postgres@v0.19.2/mod.ts";

// Standard Library Dotenv auto-load (useful for local dev)
import "https://deno.land/std@0.224.0/dotenv/load.ts";
