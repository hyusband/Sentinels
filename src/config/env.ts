import "https://deno.land/std@0.224.0/dotenv/load.ts";

const REQUIRED_VARS = [
  "DISCORD_TOKEN",
  "DATABASE_URL",
];

for (const envVar of REQUIRED_VARS) {
  if (!Deno.env.get(envVar)) {
    throw new Error(`Missing ${envVar}`);
  }
}

export const ENV = {
  DISCORD_TOKEN: Deno.env.get("DISCORD_TOKEN") || "",
  DATABASE_URL: Deno.env.get("DATABASE_URL") ||
    "postgres://user:pass@localhost:5432/db",
  BINANCE_API_KEY: Deno.env.get("BINANCE_API_KEY") || "",
  BINANCE_API_SECRET: Deno.env.get("BINANCE_API_SECRET") || "",
  NODE_ENV: Deno.env.get("NODE_ENV") || "development",
};
