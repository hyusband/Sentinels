import { discordeno } from "../../../deps.ts";
import { configCmd } from "./config.ts";
import { monitorCmd } from "./monitor.ts";
import { tradeCmd } from "./trade.ts";
import { riskCmd } from "./risk.ts";

export interface Command {
  name: string;
  description: string;
  options?: discordeno.ApplicationCommandOption[];
  execute: (
    bot: discordeno.Bot,
    interaction: discordeno.Interaction,
  ) => Promise<void>;
}

export const commands = new Map<string, Command>();

export function registerCommand(command: Command) {
  commands.set(command.name, command);
}

registerCommand(configCmd);
registerCommand(monitorCmd);
registerCommand(tradeCmd);
registerCommand(riskCmd);

export async function upsertSlashCommands(bot: discordeno.Bot) {
  const globalCommands = Array.from(commands.values()).map((cmd) => ({
    name: cmd.name,
    description: cmd.description,
    options: cmd.options,
  }));

  console.log("Upserting global slash commands...");
  await bot.helpers.upsertGlobalApplicationCommands(globalCommands);
  console.log("Successfully upserted global slash commands!");
}
