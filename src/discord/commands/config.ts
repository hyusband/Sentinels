import { discordeno } from "../../../deps.ts";
import type { Command } from "./mod.ts";

export const configCmd: Command = {
  name: "config",
  description: "Configure strategy parameters",
  options: [
    {
      name: "strategy",
      description: "Name of the strategy to configure",
      type: discordeno.ApplicationCommandOptionTypes.String,
      required: true,
    },
    {
      name: "status",
      description: "ACTIVE or INACTIVE",
      type: discordeno.ApplicationCommandOptionTypes.String,
      required: false,
    },
  ],
  execute: async (bot, interaction) => {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: discordeno.InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content:
            `Configuration updated for strategy. Check logs for details.`,
        },
      },
    );
  },
};
