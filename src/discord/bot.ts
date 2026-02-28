import { discordeno } from "../../deps.ts";
import { ENV } from "../config/env.ts";
import { setupEvents } from "./events/mod.ts";

export const bot = discordeno.createBot({
  token: ENV.DISCORD_TOKEN,
  intents: discordeno.Intents.Guilds | discordeno.Intents.GuildMessages,
  events: {},
});

setupEvents(bot);

export async function initDiscord() {
  console.log("Starting Discord bot...");
  await discordeno.startBot(bot);
}
