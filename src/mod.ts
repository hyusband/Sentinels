import { ENV } from "./config/env.ts";
import { initDb } from "./db/connection.ts";
import { initDiscord } from "./discord/bot.ts";

async function main() {
  console.log("Starting Sentinels Trading Bot...");

  try {
    await initDb();
  } catch (e) {
    console.error("Database initialization failed. Exiting...", e);
    Deno.exit(1);
  }

  console.log("Initializing Exchange WebSockets...");

  if (ENV.DISCORD_TOKEN) {
    await initDiscord();
  } else {
    console.warn(
      "No DISCORD_TOKEN provided, running without Discord interface.",
    );
  }
}

main();
