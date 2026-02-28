import { discordeno } from "../../../deps.ts";
import { commands } from "../commands/mod.ts";

export function setupEvents(bot: discordeno.Bot) {
  bot.events.ready = (_, payload) => {
    console.log(
      `[READY] Bot is online! Logged in as: ${payload.user.username}`,
    );
  };

  bot.events.interactionCreate = async (bot, interaction) => {
    if (interaction.type === discordeno.InteractionTypes.ApplicationCommand) {
      const commandName = interaction.data?.name;
      if (!commandName) return;

      const command = commands.get(commandName);
      if (command) {
        try {
          await command.execute(bot, interaction);
        } catch (error) {
          console.error(`Error executing command ${commandName}:`, error);
          await bot.helpers.sendInteractionResponse(
            interaction.id,
            interaction.token,
            {
              type:
                discordeno.InteractionResponseTypes.ChannelMessageWithSource,
              data: {
                content: "An error occurred while executing this command.",
              },
            },
          ).catch(console.error); // Ignore if response fails
        }
      }
    }
  };
}
