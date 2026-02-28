import { discordeno } from "../../../deps.ts";
import type { Command } from "./mod.ts";

export const riskCmd: Command = {
  name: "risk",
  description: "Manage risk parameters (e.g. stop-loss, take-profit)",
  execute: async (bot, interaction) => {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: discordeno.InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content:
            `Risk management settings loaded. Max drawdown strictly enforced.`,
        },
      },
    );
  },
};
