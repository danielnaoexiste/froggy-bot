import { Client, Events, Interaction, InteractionType } from 'discord.js'

import { BotEvent } from '../types'

const event: BotEvent = {
  name: Events.InteractionCreate,

  execute: async (client: Client, interaction: Interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = interaction.client.commands.get(interaction.commandName)

      const cooldown = interaction.client.cooldowns.get(
        `${interaction.commandName}-${interaction.user.username}`
      )

      if (!command) return

      if (command.cooldown && cooldown) {
        if (Date.now() < cooldown) {
          return interaction.reply({
            content: `You have to wait ${Math.floor(
              Math.abs(Date.now() - cooldown) / 1000
            )} second(s) to use this command again.`,
            ephemeral: true
          })
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
        command.execute(interaction, client)
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
