import { discordeno } from "../../../deps.ts";
import type { Command } from "./mod.ts";

export const tradeCmd: Command = {
  name: "trade",
  description: "Execute a manual trade",
  options: [
    {
      name: "symbol",
      description: "Trading pair (e.g., BTCUSDT)",
      type: discordeno.ApplicationCommandOptionTypes.String,
      required: true,
    },
    {
      name: "side",
      description: "BUY or SELL",
      type: discordeno.ApplicationCommandOptionTypes.String,
      required: true,
    },
    {
      name: "amount",
      description: "Amount to trade",
      type: discordeno.ApplicationCommandOptionTypes.Number,
      required: true,
    },
  ],
  execute: async (bot, interaction) => {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: discordeno.InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `Order requested. Executing...`,
        },
      },
    );
  },
};
