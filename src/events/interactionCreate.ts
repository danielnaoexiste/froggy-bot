import { Interaction, InteractionType } from 'discord.js'

import { BotEvent } from '../types'

const event: BotEvent = {
  name: 'interactionCreate',
  execute: async (interaction: Interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      let command = interaction.client.commands.get(interaction.commandName)

      let cooldown = interaction.client.cooldowns.get(
        `${interaction.commandName}-${interaction.user.username}`
      )

      if (!command) return

      if (command.cooldown && cooldown) {
        if (Date.now() < cooldown) {
          interaction.reply({
            content: `You have to wait ${Math.floor(
              Math.abs(Date.now() - cooldown) / 1000
            )} second(s) to use this command again.`,
            ephemeral: true
          })
          setTimeout(() => interaction.deleteReply(), 5000)
          return
        }

        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.username}`,
          Date.now() + command.cooldown * 1000
        )

        setTimeout(() => {
          interaction.client.cooldowns.delete(
            `${interaction.commandName}-${interaction.user.username}`
          )
        }, command.cooldown * 1000)
      } else if (command.cooldown && !cooldown) {
        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.username}`,
          Date.now() + command.cooldown * 1000
        )
      }

      try {
        command.execute(interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
        })
      }
    }
  }
}

export default event
