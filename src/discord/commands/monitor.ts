import { discordeno } from "../../../deps.ts";
import type { Command } from "./mod.ts";

export const monitorCmd: Command = {
  name: "monitor",
  description: "Monitor active positions and market status",
  execute: async (bot, interaction) => {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: discordeno.InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content:
            `📈 **Active Positions**\nCurrently no active positions.\n\nMarket analysis looks stable.`,
        },
      },
    );
  },
};
